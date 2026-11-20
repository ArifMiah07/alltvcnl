import { Show, createMemo, createSignal } from "solid-js";
import { PageMeta } from "../components/ui/PageMeta";
import { Button } from "../components/ui/Button";
import { Select } from "../components/ui/Field";
import { ChannelGrid } from "../features/channels/ChannelGrid";
import { ChannelToolbar, PaginationControls } from "../features/channels/ChannelToolbar";
import { PageHeader } from "../features/channels/PageHeader";
import { appState } from "../lib/stores";
import { catalogSchema } from "../lib/seo";
import { clampPage, paginate } from "../lib/pagination";

export default function Favorites() {
  const [search, setSearch] = createSignal("");
  const [sort, setSort] = createSignal("name");
  const [page, setPage] = createSignal(1);

  const filtered = createMemo(() => {
    const term = search().trim().toLowerCase();
    const order = sort();
    const items = appState.favorites().filter((channel) => !term || `${channel.name} ${channel.group}`.toLowerCase().includes(term));
    return [...items].sort((a, b) => {
      const nameA = a.name ?? "";
      const nameB = b.name ?? "";
      return order === "group" ? (a.group ?? "").localeCompare(b.group ?? "") || nameA.localeCompare(nameB) : nameA.localeCompare(nameB);
    });
  });

  const totalPages = createMemo(() => Math.max(1, Math.ceil(filtered().length / appState.channelsPerPage())));
  const visible = createMemo(() => paginate(filtered(), page(), appState.channelsPerPage()));

  return (
    <>
      <PageMeta
        title="Favorite Channels - AllTVCNL"
        description="Your saved IPTV channels, stored privately on this device."
        path="/favorites"
        schema={catalogSchema("Favorite Channels", "Your saved IPTV channels, stored privately on this device.", "/favorites")}
      />
      <PageHeader
        title="Favorites"
        description="Saved channels are shared across every view and never leave your device."
        action={
          <Show when={appState.favorites().length > 0}>
            <Button variant="secondary" onClick={() => appState.setFavorites([])}>Clear all</Button>
          </Show>
        }
      />

      <div class="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div class="flex-1">
          <ChannelToolbar
            search={search()}
            onSearch={(value) => {
              setSearch(value);
              setPage(1);
            }}
            pageSize={appState.channelsPerPage()}
            onPageSize={(value) => {
              appState.setChannelsPerPage(value);
              setPage(1);
            }}
            totalItems={filtered().length}
          />
        </div>
        <label class="flex items-center gap-2 text-sm font-semibold text-slate-800 dark:text-white/80">
          Sort
          <Select value={sort()} onChange={(event) => setSort(event.currentTarget.value)}>
            <option value="name">Name</option>
            <option value="group">Group</option>
          </Select>
        </label>
      </div>

      <div class="mt-5">
        <ChannelGrid channels={visible()} emptyMessage="Save channels from any list to see them here." startIndex={(page() - 1) * appState.channelsPerPage()} />
        <div class="mt-6">
          <PaginationControls page={clampPage(page(), totalPages())} totalPages={totalPages()} onPage={setPage} />
        </div>
      </div>
    </>
  );
}
