import { Show, createSignal, onSettled } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { appState } from "../../lib/stores";
import { sitePath } from "../../lib/api/config";
import type { Channel } from "../../lib/types";
import { safeHref, safeMediaUrl } from "../../lib/validation/url";
import { Icon } from "../../components/ui/Icon";
import { HlsPlayer } from "../player/HlsPlayer";

interface ChannelCardProps {
  channel: Channel;
  number?: number;
  expanded?: boolean;
  onToggle?: () => void;
}

export function ChannelCard(props: ChannelCardProps) {
  const navigate = useNavigate();
  const logo = () => safeHref(props.channel.logo) ?? "";
  const streamUrl = () => props.channel.url || "";
  const externalHref = () => safeMediaUrl(streamUrl()) ?? "";
  const name = () => props.channel.name ?? "Channel";
  const watchHref = () => sitePath(`/watch?url=${encodeURIComponent(streamUrl())}&title=${encodeURIComponent(name())}`);
  const isFavorite = () => appState.isFavorite(props.channel);
  const expanded = () => appState.videoCards() || (props.expanded ?? false);
  const [inView, setInView] = createSignal(false);
  const showPlayer = () => expanded() && inView();
  let card!: HTMLElement;

  onSettled(() => {
    if (!("IntersectionObserver" in window)) {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => setInView(entries[0]?.isIntersecting ?? false),
      { rootMargin: "150px" },
    );
    observer.observe(card);
    return () => observer.disconnect();
  });

  const addToNewPlaylist = () => {
    const id = appState.createPlaylist(`${name()} playlist`);
    appState.addToPlaylist(id, props.channel);
  };

  const actionClass =
    "flex h-7 w-7 shrink-0 items-center justify-center rounded-sm border border-brand-purple/25 bg-white text-brand-purple shadow-sm transition hover:bg-brand-purple hover:text-white group-hover:border-white/40 group-hover:bg-white/20 group-hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple";

  return (
    <article
      ref={(element) => (card = element)}
      class="group w-full overflow-hidden rounded-sm border border-rose-50 bg-[radial-gradient(circle_at_50%_75%,#e0f2fe_0%,#ede9fe_55%,#fae8ff_100%)] shadow-sm transition hover:border-brand-purple/40 hover:shadow-md dark:border-white/10 dark:bg-[radial-gradient(circle_at_50%_75%,#111827_0%,#1f1235_60%,#26102d_100%)]">
      <div class="flex w-full flex-row flex-nowrap items-center bg-white/30 shadow-md transition-colors hover:bg-brand-purple hover:text-white dark:bg-slate-900/35">
        <div class="shrink-0 p-1">
          <ChannelLogo src={logo()} />
        </div>

        <div class="min-w-0 flex-1">
          <div class="flex gap-2 px-2 text-[16px] font-medium text-slate-900 group-hover:text-white dark:text-white sm:text-[18px]">
            <span class="shrink-0">{props.number ?? "•"}.</span>
            <p class="truncate" title={name()}>
              {name()}
            </p>
          </div>

          <div class="flex flex-wrap items-center gap-2 p-2">
            <button type="button" class={actionClass} aria-label={`Open ${name()} in player`} onClick={() => navigate(watchHref())}>
              <Icon name="play" size={14} />
            </button>

            <Show when={externalHref()}>
              {(url) => (
                <a class={actionClass} href={url()} target="_blank" rel="noopener noreferrer" aria-label={`Open ${name()} stream link`}>
                  <Icon name="external" size={14} />
                </a>
              )}
            </Show>

            <button
              type="button"
              class={`${actionClass} ${isFavorite() ? "bg-brand-purple text-white group-hover:bg-white group-hover:text-brand-purple" : ""}`}
              aria-label={isFavorite() ? `Remove ${name()} from favorites` : `Add ${name()} to favorites`}
              onClick={() => appState.toggleFavorite(props.channel)}>
              <Icon name={isFavorite() ? "bookmark-filled" : "bookmark"} size={14} />
            </button>

            <button
              type="button"
              class={actionClass}
              aria-label={`Create playlist for ${name()}`}
              title="Create playlist with this channel"
              onClick={addToNewPlaylist}>
              <Icon name="list-plus" size={14} />
            </button>

            <button
              type="button"
              class={actionClass}
              aria-expanded={expanded() ? "true" : "false"}
              aria-label={expanded() ? `Hide ${name()} details` : `Show ${name()} details`}
              onClick={() => props.onToggle?.()}>
              <Icon name={expanded() ? "chevron-up" : "chevron-down"} size={14} />
            </button>

            <span class="truncate text-xs font-semibold text-slate-700 group-hover:text-white dark:text-white/75">
              {props.channel.group || props.channel.category || "Uncategorized"}
            </span>
          </div>
        </div>
      </div>

      <Show when={expanded()}>
        <div class="border-t border-emerald-50 dark:border-white/10">
          <Show when={showPlayer()}>
            <Show
              when={safeMediaUrl(streamUrl())}
              fallback={<p class="p-3 text-xs font-semibold text-rose-700 dark:text-rose-300">No stream URL is available for this channel.</p>}>
              {(url) => <HlsPlayer src={url()} title={name()} />}
            </Show>
          </Show>

          <dl class="grid grid-cols-1 gap-2 p-3 text-xs sm:grid-cols-2">
            <div>
              <dt class="font-bold uppercase tracking-wide text-slate-500 dark:text-white/50">Group</dt>
              <dd class="mt-0.5 truncate text-slate-800 dark:text-white/80">{props.channel.group || props.channel.category || "Uncategorized"}</dd>
            </div>
            <Show when={props.channel.country}>
              <div>
                <dt class="font-bold uppercase tracking-wide text-slate-500 dark:text-white/50">Country</dt>
                <dd class="mt-0.5 text-slate-800 dark:text-white/80">{String(props.channel.country)}</dd>
              </div>
            </Show>
            <Show when={props.channel.feed}>
              <div>
                <dt class="font-bold uppercase tracking-wide text-slate-500 dark:text-white/50">Feed</dt>
                <dd class="mt-0.5 text-slate-800 dark:text-white/80">{String(props.channel.feed)}</dd>
              </div>
            </Show>
            <Show when={props.channel.quality}>
              <div>
                <dt class="font-bold uppercase tracking-wide text-slate-500 dark:text-white/50">Quality</dt>
                <dd class="mt-0.5 text-slate-800 dark:text-white/80">{String(props.channel.quality)}</dd>
              </div>
            </Show>
          </dl>
        </div>
      </Show>
    </article>
  );
}

function ChannelLogo(props: { src: string }) {
  const [failed, setFailed] = createSignal(false);
  const source = () => (props.src && !failed() ? props.src : "/favicon.png");

  return (
    <img
      src={source()}
      alt=""
      loading="lazy"
      decoding="async"
      referrerpolicy="no-referrer"
      class="h-12 w-12 rounded p-1 shadow-md backdrop-blur-sm isolate border border-black/10 bg-white/30 object-contain dark:border-white/10 [filter:drop-shadow(0px_0px_1px_rgba(0,0,0,0.8))_drop-shadow(0px_0px_1px_rgba(255,255,255,0.8))] sm:h-16 sm:w-16 md:h-20 md:w-20"
      onError={() => setFailed(true)}
    />
  );
}
