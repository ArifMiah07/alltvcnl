import { Show, createMemo, createSignal } from "solid-js";
import { useSearchParams } from "@solidjs/router";
import { PageMeta } from "../components/ui/PageMeta";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Field";
import { ErrorState, SkeletonGrid } from "../components/ui/State";
import { ChannelGrid } from "../features/channels/ChannelGrid";
import { PaginationControls } from "../features/channels/ChannelToolbar";
import { PageHeader } from "../features/channels/PageHeader";
import { appState } from "../lib/stores";
import { searchStreams } from "../lib/api/client";
import { createResource } from "../lib/resource";
import { searchResultsSchema } from "../lib/seo";
import { clampPage, paginate } from "../lib/pagination";
import { cleanText } from "../lib/validation/text";

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initial = () => cleanText(searchParams.q);
  const [input, setInput] = createSignal<string>(() => initial());
  const [term, setTerm] = createSignal<string>(() => initial());
  const [page, setPage] = createSignal(1);

  const results = createResource(
    (signal, value) => (value.trim() ? searchStreams(value.trim(), signal) : Promise.resolve({ items: [], totalItems: 0, totalPages: 1 })),
    () => term(),
  );

  const totalPages = createMemo(() => Math.max(1, Math.ceil((results().data?.items.length ?? 0) / appState.channelsPerPage())));
  const visible = createMemo(() => paginate(results().data?.items ?? [], page(), appState.channelsPerPage()));

  const submit = (event: SubmitEvent) => {
    event.preventDefault();
    const value = cleanText(input());
    setTerm(value);
    setPage(1);
    setSearchParams({ q: value || undefined });
  };

  return (
    <>
      <PageMeta
        title={term() ? `Search ${term()} - AllTVCNL` : "Search Channels - AllTVCNL"}
        description="Search live IPTV channels by name, category, or stream URL."
        path="/search"
        schema={searchResultsSchema(term())}
      />
      <PageHeader title="Search channels" description="Find channels across the backend catalog. Results are cached while you paginate." />

      <form class="flex flex-col gap-2 sm:flex-row" onSubmit={submit}>
        <label class="relative flex-1">
          <span class="sr-only">Search term</span>
          <Input type="search" value={input()} placeholder="Channel name, category, or URL" onInput={(event) => setInput(event.currentTarget.value)} />
        </label>
        <Button type="submit">Search</Button>
      </form>

      <div class="mt-5">
        <Show when={!results().loading} fallback={<SkeletonGrid />}>
          <Show when={!results().error} fallback={<ErrorState message={results().error} />}>
            <Show when={term()} fallback={<p class="glass-panel rounded-sm p-5 text-sm text-slate-700 dark:text-white/65">Enter a search term to find channels.</p>}>
              <ChannelGrid channels={visible()} emptyMessage={`No channels matched "${term()}".`} startIndex={(page() - 1) * appState.channelsPerPage()} />
              <div class="mt-6">
                <PaginationControls page={clampPage(page(), totalPages())} totalPages={totalPages()} onPage={setPage} />
              </div>
            </Show>
          </Show>
        </Show>
      </div>
    </>
  );
}
