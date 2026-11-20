import { For, Show, createEffect, createSignal } from "solid-js";
import { PageMeta } from "../components/ui/PageMeta";
import { ErrorState, SkeletonGrid } from "../components/ui/State";
import { ChannelGrid } from "../features/channels/ChannelGrid";
import { ChannelToolbar, PaginationControls } from "../features/channels/ChannelToolbar";
import { PageHeader } from "../features/channels/PageHeader";
import { appState } from "../lib/stores";
import { getVerifiedGroups, getVerifiedStreams } from "../lib/api/client";
import { createResource } from "../lib/resource";
import { catalogSchema } from "../lib/seo";
import { clampPage } from "../lib/pagination";

export default function Verified() {
  const [page, setPage] = createSignal(1);
  const [searchInput, setSearchInput] = createSignal("");
  const [search, setSearch] = createSignal("");
  const [group, setGroup] = createSignal("");
  const [reloadKey, setReloadKey] = createSignal(0);

  createEffect(
    () => searchInput(),
    (value) => {
      const timer = setTimeout(() => {
        setSearch(value);
        setPage(1);
      }, 300);
      return () => clearTimeout(timer);
    },
  );

  const groups = createResource((signal) => getVerifiedGroups(signal), () => reloadKey());
  const streams = createResource(
    (signal, deps) => getVerifiedStreams({ currentPage: deps.currentPage, channelsPerPage: deps.channelsPerPage, search: deps.search, group: deps.group }, signal),
    () => ({ currentPage: page(), channelsPerPage: appState.channelsPerPage(), search: search(), group: group(), reloadKey: reloadKey() }),
  );

  return (
    <>
      <PageMeta
        title="Verified IPTV Streams - AllTVCNL"
        description="Browse verified live IPTV streams grouped by category."
        path="/verified"
        schema={catalogSchema("Verified IPTV Streams", "Browse verified live IPTV streams grouped by category.", "/verified")}
      />
      <PageHeader title="Verified streams" description="Streams validated by the backend and grouped for easier discovery." />

      <ChannelToolbar
        search={searchInput()}
        onSearch={setSearchInput}
        groups={groups().data ?? []}
        group={group()}
        onGroup={(value) => {
          setGroup(value);
          setPage(1);
        }}
        pageSize={appState.channelsPerPage()}
        onPageSize={(value) => {
          appState.setChannelsPerPage(value);
          setPage(1);
        }}
        totalItems={streams().data?.totalItems}
        onReload={() => setReloadKey((value) => value + 1)}
      />

      <Show when={groups().error}>
        <p class="mt-3 text-sm text-amber-700 dark:text-amber-400">Groups could not be loaded. You can still browse all streams.</p>
      </Show>

      <div class="mt-5">
        <Show when={!streams().loading} fallback={<SkeletonGrid />}>
          <Show when={!streams().error} fallback={<ErrorState message={streams().error} onRetry={() => setReloadKey((value) => value + 1)} />}>
            <ChannelGrid channels={streams().data?.items ?? []} startIndex={(page() - 1) * appState.channelsPerPage()} />
            <div class="mt-6">
              <PaginationControls page={clampPage(page(), streams().data?.totalPages ?? 1)} totalPages={streams().data?.totalPages ?? 1} onPage={setPage} />
            </div>
          </Show>
        </Show>
      </div>

      <Show when={(groups().data ?? []).length > 0}>
        <div class="mt-6 flex flex-wrap gap-2">
          <For each={groups().data ?? []}>
            {(item) => (
              <button
                type="button"
                class={`rounded-full border px-3 py-1 text-xs font-semibold ${group() === item ? "border-brand-purple bg-brand-purple text-white shadow-md" : "border-white/60 bg-white/35 text-slate-800 backdrop-blur hover:bg-brand-purple hover:text-white dark:border-white/10 dark:bg-slate-900/50 dark:text-white"}`}
                onClick={() => {
                  setGroup(group() === item ? "" : item);
                  setPage(1);
                }}>
                {item}
              </button>
            )}
          </For>
        </div>
      </Show>
    </>
  );
}
