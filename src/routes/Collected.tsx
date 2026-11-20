import { Show, createMemo, createSignal } from "solid-js";
import { PageMeta } from "../components/ui/PageMeta";
import { ErrorState, SkeletonGrid } from "../components/ui/State";
import { ChannelGrid } from "../features/channels/ChannelGrid";
import { ChannelToolbar, PaginationControls } from "../features/channels/ChannelToolbar";
import { PageHeader } from "../features/channels/PageHeader";
import { appState } from "../lib/stores";
import { getCollectedChannels } from "../lib/api/client";
import { createResource } from "../lib/resource";
import { catalogSchema } from "../lib/seo";
import { clampPage, paginate } from "../lib/pagination";

export default function Collected() {
  const [page, setPage] = createSignal(1);
  const [reloadKey, setReloadKey] = createSignal(0);
  const state = createResource((signal) => getCollectedChannels(signal), () => reloadKey());

  const filtered = createMemo(() => {
    const term = appState.collectedSearch().trim().toLowerCase();
    const items = state().data ?? [];
    if (!term) return items;
    return items.filter((channel) => `${channel.name} ${channel.group}`.toLowerCase().includes(term));
  });

  const totalPages = createMemo(() => Math.max(1, Math.ceil(filtered().length / appState.channelsPerPage())));
  const visible = createMemo(() => paginate(filtered(), page(), appState.channelsPerPage()));

  return (
    <>
      <PageMeta
        title="Collected IPTV Channels - AllTVCNL"
        description="Browse the collected IPTV channel catalog with fast local search."
        path="/collected"
        schema={catalogSchema("Collected IPTV Channels", "Browse the collected IPTV channel catalog with fast local search.", "/collected")}
      />
      <PageHeader title="Collected channels" description="This catalog is downloaded once and searched locally for instant results." />

      <ChannelToolbar
        search={appState.collectedSearch()}
        onSearch={(value) => {
          appState.setCollectedSearch(value);
          setPage(1);
        }}
        pageSize={appState.channelsPerPage()}
        onPageSize={(value) => {
          appState.setChannelsPerPage(value);
          setPage(1);
        }}
        totalItems={filtered().length}
        onReload={() => setReloadKey((value) => value + 1)}
      />

      <div class="mt-5">
        <Show when={!state().loading} fallback={<SkeletonGrid />}>
          <Show when={!state().error} fallback={<ErrorState message={state().error} onRetry={() => setReloadKey((value) => value + 1)} />}>
            <ChannelGrid channels={visible()} startIndex={(page() - 1) * appState.channelsPerPage()} />
            <div class="mt-6">
              <PaginationControls page={clampPage(page(), totalPages())} totalPages={totalPages()} onPage={setPage} />
            </div>
          </Show>
        </Show>
      </div>
    </>
  );
}
