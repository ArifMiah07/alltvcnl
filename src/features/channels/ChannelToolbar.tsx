import { For, Show, createEffect, createSignal } from "solid-js";
import { Icon } from "../../components/ui/Icon";
import { Input, Select } from "../../components/ui/Field";
import { clampPageSize, pageNumbers } from "../../lib/pagination";
import { appState } from "../../lib/stores";

export function ChannelToolbar(props: {
  search: string;
  onSearch: (value: string) => void;
  groups?: string[];
  group?: string;
  onGroup?: (value: string) => void;
  pageSize: number;
  onPageSize: (value: number) => void;
  totalItems?: number;
  onReload?: () => void;
}) {
  const [channelsInput, setChannelsInput] = createSignal("");

  createEffect(
    () => props.pageSize,
    () => {
      setChannelsInput(String(props.pageSize));
    },
  );

  const applyPageSize = () => {
    const size = clampPageSize(channelsInput(), props.pageSize);
    props.onPageSize(size);
    setChannelsInput(String(size));
  };

  return (
    <div class="glass-bar flex flex-col gap-3 rounded-sm p-3 lg:flex-row lg:items-center">
      <label class="relative flex-1">
        <span class="sr-only">Search channels</span>
        <Icon name="search" size={16} class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-600 dark:text-white/60" />
        <Input class="pl-9" type="search" placeholder="Search channels..." value={props.search} onInput={(event) => props.onSearch(event.currentTarget.value)} />
      </label>

      <Show when={props.groups && props.groups.length > 0}>
        <label class="flex items-center gap-2 text-sm font-semibold text-slate-800 dark:text-white/80">
          Group
          <Select value={props.group ?? ""} onChange={(event) => props.onGroup?.(event.currentTarget.value)}>
            <option value="">All groups</option>
            <For each={props.groups}>{(group) => <option value={group}>{group}</option>}</For>
          </Select>
        </label>
      </Show>

      <label class="flex items-center gap-2 text-sm font-semibold text-slate-800 dark:text-white/80">
        Channels per page
        <Input
          class="w-20 text-center"
          type="number"
          min="1"
          max="200"
          value={channelsInput()}
          onInput={(event) => setChannelsInput(event.currentTarget.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") applyPageSize();
          }}
        />
        <button
          type="button"
          class="rounded-sm border border-white/60 bg-white/45 px-3 py-2 text-xs font-bold text-slate-800 backdrop-blur transition hover:bg-brand-purple hover:text-white dark:border-white/10 dark:bg-slate-900/55 dark:text-white"
          onClick={applyPageSize}>
          Set
        </button>
      </label>

      <button
        type="button"
        class="flex items-center gap-1.5 rounded-sm border border-white/60 bg-white/45 px-3 py-2 text-sm font-bold text-slate-800 backdrop-blur transition hover:bg-brand-purple hover:text-white dark:border-white/10 dark:bg-slate-900/55 dark:text-white"
        aria-pressed={appState.videoCards() ? "true" : "false"}
        onClick={() => appState.toggleVideoCards()}>
        <Icon name={appState.videoCards() ? "list" : "grid"} size={15} />
        {appState.videoCards() ? "Show List View" : "Show Grid View"}
      </button>

      <Show when={typeof props.totalItems === "number"}>
        <span class="text-sm font-semibold text-slate-700 dark:text-white/60">{props.totalItems} channels</span>
      </Show>

      <Show when={props.onReload}>
        <button
          type="button"
          class="rounded-sm border border-white/60 bg-white/45 p-2 text-slate-800 shadow-sm backdrop-blur transition hover:bg-brand-purple hover:text-white dark:border-white/10 dark:bg-slate-900/55 dark:text-white"
          aria-label="Reload channels"
          onClick={() => props.onReload?.()}>
          <Icon name="refresh" size={16} />
        </button>
      </Show>
    </div>
  );
}

export function PaginationControls(props: { page: number; totalPages: number; onPage: (page: number) => void; onGoto?: (page: number) => void }) {
  const [gotoPage, setGotoPage] = createSignal("");

  createEffect(
    () => props.page,
    () => {
      setGotoPage("");
    },
  );

  const submitGoto = (event: SubmitEvent) => {
    event.preventDefault();
    const page = Number(gotoPage());
    if (!Number.isFinite(page)) return;
    const target = Math.min(Math.max(Math.floor(page), 1), props.totalPages);
    (props.onGoto ?? props.onPage)(target);
    setGotoPage("");
  };

  return (
    <Show when={props.totalPages > 1}>
      <nav class="flex flex-wrap items-center justify-center gap-2" aria-label="Pagination">
        <button
          type="button"
          class="rounded-sm border border-white/60 bg-white/40 p-2 text-slate-800 backdrop-blur disabled:opacity-40 dark:border-white/10 dark:bg-slate-900/50 dark:text-white"
          disabled={props.page <= 1}
          aria-label="Previous page"
          onClick={() => props.onPage(props.page - 1)}>
          <Icon name="chevron-left" size={16} />
        </button>
        <For each={pageNumbers(props.page, props.totalPages)}>
          {(page) => (
            <button
              type="button"
              class={`h-9 w-9 rounded-sm text-sm font-bold ${
                page === props.page
                  ? "bg-brand-purple text-white shadow-md"
                  : "border border-white/60 bg-white/40 text-slate-800 backdrop-blur hover:bg-brand-purple hover:text-white dark:border-white/10 dark:bg-slate-900/50 dark:text-white"
              }`}
              aria-current={page === props.page ? "page" : undefined}
              onClick={() => props.onPage(page)}>
              {page}
            </button>
          )}
        </For>
        <button
          type="button"
          class="rounded-sm border border-white/60 bg-white/40 p-2 text-slate-800 backdrop-blur disabled:opacity-40 dark:border-white/10 dark:bg-slate-900/50 dark:text-white"
          disabled={props.page >= props.totalPages}
          aria-label="Next page"
          onClick={() => props.onPage(props.page + 1)}>
          <Icon name="chevron-right" size={16} />
        </button>
        <form class="ml-1 flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-white/60" onSubmit={submitGoto}>
          <label for="pagination-goto">Go to page</label>
          <input
            id="pagination-goto"
            class="w-16 rounded-sm border border-white/60 bg-white/45 px-2 py-2 text-center text-sm font-bold text-slate-800 backdrop-blur dark:border-white/10 dark:bg-slate-900/50 dark:text-white"
            type="number"
            min="1"
            max={props.totalPages}
            value={gotoPage()}
            onInput={(event) => setGotoPage(event.currentTarget.value)}
          />
          <button
            type="submit"
            class="rounded-sm border border-white/60 bg-white/45 px-3 py-2 text-xs font-bold text-slate-800 backdrop-blur transition hover:bg-brand-purple hover:text-white dark:border-white/10 dark:bg-slate-900/55 dark:text-white">
            Go
          </button>
        </form>
      </nav>
    </Show>
  );
}
