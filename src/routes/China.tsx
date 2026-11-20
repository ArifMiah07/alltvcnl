import { Show, createEffect, createSignal } from "solid-js";
import { PageMeta } from "../components/ui/PageMeta";
import { ErrorState, SkeletonGrid } from "../components/ui/State";
import { ChannelGrid } from "../features/channels/ChannelGrid";
import { ChannelToolbar, PaginationControls } from "../features/channels/ChannelToolbar";
import { PageHeader } from "../features/channels/PageHeader";
import { appState } from "../lib/stores";
import { getChinaIptv } from "../lib/api/client";
import { createResource } from "../lib/resource";
import { catalogSchema } from "../lib/seo";
import { clampPage } from "../lib/pagination";

export default function China() {
  const [page, setPage] = createSignal(1);
  const [searchInput, setSearchInput] = createSignal("");
  const [term, setTerm] = createSignal("");
  const [reloadKey, setReloadKey] = createSignal(0);

  createEffect(
    () => searchInput(),
    (value) => {
      const timer = setTimeout(() => {
        setTerm(value);
        setPage(1);
      }, 300);
      return () => clearTimeout(timer);
    },
  );

  const state = createResource(
    (signal, deps) => getChinaIptv({ currentPage: deps.currentPage, channelsPerPage: deps.channelsPerPage, term: deps.term }, signal),
    () => ({ currentPage: page(), channelsPerPage: appState.channelsPerPage(), term: term(), reloadKey: reloadKey() }),
  );

  return (
    <>
      <PageMeta
        title="China IPTV Channels - AllTVCNL"
        description="Browse and search China IPTV live channels."
        path="/china"
        schema={catalogSchema("China IPTV Channels", "Browse and search China IPTV live channels.", "/china")}
      />
      <PageHeader title="China IPTV" description="Live channels from the China IPTV source, paginated by the backend." />

      <ChannelToolbar
        search={searchInput()}
        onSearch={setSearchInput}
        pageSize={appState.channelsPerPage()}
        onPageSize={(value) => {
          appState.setChannelsPerPage(value);
          setPage(1);
        }}
        totalItems={state().data?.totalItems}
        onReload={() => setReloadKey((value) => value + 1)}
      />

      <div class="mt-5">
        <Show when={!state().loading} fallback={<SkeletonGrid />}>
          <Show when={!state().error} fallback={<ErrorState message={state().error} onRetry={() => setReloadKey((value) => value + 1)} />}>
            <ChannelGrid channels={state().data?.items ?? []} startIndex={(page() - 1) * appState.channelsPerPage()} />
            <div class="mt-6">
              <PaginationControls page={clampPage(page(), state().data?.totalPages ?? 1)} totalPages={state().data?.totalPages ?? 1} onPage={setPage} />
            </div>
          </Show>
        </Show>
      </div>
    </>
  );
}
