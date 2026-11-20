import { Show, createSignal } from "solid-js";
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
  const watchHref = () =>
    sitePath(
      `/watch?url=${encodeURIComponent(streamUrl())}&title=${encodeURIComponent(name())}&status=${encodeURIComponent(String(props.channel.status ?? ""))}`,
    );
  const favoriteKey = () => String(props.channel.id || streamUrl() || name());
  const isFavorite = () => appState.favoriteKeys().has(favoriteKey());
  const expanded = () => appState.videoCards() || (props.expanded ?? false);

  const addToNewPlaylist = () => {
    const id = appState.createPlaylist(`${name()} playlist`);
    appState.addToPlaylist(id, props.channel);
  };

  const actionClass =
    "flex h-7 w-7 shrink-0 items-center justify-center rounded-sm border shadow-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple dark:shadow-none";

  const actionToneClass =
    "border-brand-purple/25 bg-white text-brand-purple hover:bg-brand-purple hover:text-white group-hover:border-white/40 group-hover:bg-white/20 group-hover:text-white dark:border-fuchsia-400/25 dark:bg-slate-800 dark:text-fuchsia-300 dark:hover:bg-fuchsia-600 dark:hover:text-white dark:group-hover:border-fuchsia-400/40 dark:group-hover:bg-fuchsia-600 dark:group-hover:text-white";

  return (
    <article
      class="channel-card group w-full overflow-hidden rounded-sm border border-rose-50 bg-slate-50 shadow-sm dark:border-white/10 dark:bg-slate-900/60">
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
            <button type="button" class={`${actionClass} ${actionToneClass}`} aria-label={`Open ${name()} in player`} onClick={() => navigate(watchHref())}>
              <Icon name="play" size={14} />
            </button>

            <Show when={externalHref()}>
              {(url) => (
                <a class={`${actionClass} ${actionToneClass}`} href={url()} target="_blank" rel="noopener noreferrer" aria-label={`Open ${name()} stream link`}>
                  <Icon name="external" size={14} />
                </a>
              )}
            </Show>

            <button
              type="button"
              class={`${actionClass} ${actionToneClass}`}
              aria-label={isFavorite() ? `Remove ${name()} from favorites` : `Add ${name()} to favorites`}
              onClick={() => appState.toggleFavorite(props.channel)}>
              <Icon name={isFavorite() ? "bookmark-filled" : "bookmark"} size={14} />
            </button>

            <button
              type="button"
              class={`${actionClass} ${actionToneClass}`}
              aria-label={`Create playlist for ${name()}`}
              title="Create playlist with this channel"
              onClick={addToNewPlaylist}>
              <Icon name="list-plus" size={14} />
            </button>

            <button
              type="button"
              class={`${actionClass} ${actionToneClass}`}
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
          <Show
            when={safeMediaUrl(streamUrl())}
            fallback={<p class="p-3 text-xs font-semibold text-rose-700 dark:text-rose-300">No stream URL is available for this channel.</p>}>
            {(url) => <div class="p-2"><HlsPlayer src={url()} status={props.channel.status} /></div>}
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
  const source = () => (props.src && !failed() ? props.src : "/logo-fallback.webp");

  return (
    <img
      src={source()}
      alt=""
      width={64}
      height={64}
      loading="lazy"
      decoding="async"
      referrerpolicy="no-referrer"
      class="h-12 w-12 rounded border border-black/10 bg-white/80 p-1 object-contain dark:border-white/10 dark:bg-slate-900/70 sm:h-16 sm:w-16 md:h-20 md:w-20"
      onError={() => setFailed(true)}
    />
  );
}
