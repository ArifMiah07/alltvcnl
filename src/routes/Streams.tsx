import { Show, createEffect, createMemo, createSignal } from "solid-js";
import { useSearchParams } from "@solidjs/router";
import { PageMeta } from "../components/ui/PageMeta";
import { ErrorState, SkeletonGrid } from "../components/ui/State";
import { ChannelGrid } from "../features/channels/ChannelGrid";
import { ChannelToolbar, PaginationControls } from "../features/channels/ChannelToolbar";
import { PageHeader } from "../features/channels/PageHeader";
import { appState } from "../lib/stores";
import { getStreams } from "../lib/api/client";
import { createResource } from "../lib/resource";
import { catalogSchema } from "../lib/seo";
import { clampPage } from "../lib/pagination";

export default function Streams() {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageFromParam = () => clampPage(searchParams.page ?? 1, 100000);
  const [page, setPage] = createSignal(pageFromParam());
  const [search, setSearch] = createSignal("");
  const [reloadKey, setReloadKey] = createSignal(0);
  const state = createResource(
    (signal, deps) => getStreams({ currentPage: deps.currentPage, channelsPerPage: deps.channelsPerPage }, signal),
    () => ({ currentPage: page(), channelsPerPage: appState.channelsPerPage(), reloadKey: reloadKey() }),
  );

  const totalPages = createMemo(() => Math.max(1, state().data?.totalPages ?? 1));
  const current = createMemo(() => clampPage(page(), totalPages()));

  createEffect(
    () => searchParams.page,
    () => {
      setPage(pageFromParam());
    },
  );

  const goToPage = (value: number) => {
    const target = clampPage(value, totalPages());
    setPage(target);
    setSearchParams({ page: target > 1 ? String(target) : undefined });
  };

  const filtered = createMemo(() => {
    const term = search().trim().toLowerCase();
    const items = state().data?.items ?? [];
    if (!term) return items;
    return items.filter((channel) => `${channel.name} ${channel.group}`.toLowerCase().includes(term));
  });

  return (
    <>
      <PageMeta
        title={page() > 1 ? `All Live Channels - Page ${page()} - AllTVCNL` : "All Live Channels - AllTVCNL"}
        description="Browse paginated live IPTV channels from the production API."
        path={`/streams?page=${page()}`}
        prevPath={page() > 1 ? `/streams?page=${page() - 1}` : undefined}
        nextPath={page() < totalPages() ? `/streams?page=${page() + 1}` : undefined}
        schema={catalogSchema("All Live Channels", "Browse paginated live IPTV channels from the production API.", `/streams?page=${page()}`)}
      />
      <PageHeader title="All channels" description="Paginated results from the live IPTV API. Search filters the current page instantly." />

      <ChannelToolbar
        search={search()}
        onSearch={setSearch}
        pageSize={appState.channelsPerPage()}
        onPageSize={(value) => {
          appState.setChannelsPerPage(value);
          goToPage(1);
        }}
        totalItems={state().data?.totalItems}
        onReload={() => setReloadKey((value) => value + 1)}
      />

      <div class="mt-5">
        <Show when={!state().loading} fallback={<SkeletonGrid />}>
          <Show when={!state().error} fallback={<ErrorState message={state().error} onRetry={() => setReloadKey((value) => value + 1)} />}>
            <ChannelGrid channels={filtered()} startIndex={(current() - 1) * appState.channelsPerPage()} />
            <div class="mt-6">
              <PaginationControls page={current()} totalPages={totalPages()} onPage={goToPage} onGoto={goToPage} />
            </div>
          </Show>
        </Show>
      </div>
    </>
  );
}
