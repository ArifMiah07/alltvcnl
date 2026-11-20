import { For, Show, createEffect, createMemo, createSignal } from "solid-js";
import { PageMeta } from "../components/ui/PageMeta";
import { Button } from "../components/ui/Button";
import { PageHeader } from "../features/channels/PageHeader";
import { HlsPlayer } from "../features/player/HlsPlayer";
import { sitePath } from "../lib/api/config";
import { appState } from "../lib/stores";
import type { Channel } from "../lib/types";
import { safeMediaUrl } from "../lib/validation/url";
import { MAX_M3U_CHANNELS, MAX_M3U_LENGTH, MAX_M3U_LINES } from "../lib/validation/playlist";

function parseM3u(raw: string): Channel[] {
  const lines = raw.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  const channels: Channel[] = [];
  let name = "";
  for (const line of lines) {
    if (line.startsWith("#EXTINF:")) {
      name = line.split(",").slice(1).join(",").trim() || "Untitled channel";
      continue;
    }
    if (line.startsWith("#")) continue;
    const url = safeMediaUrl(line);
    if (!url) continue;
    channels.push({ id: url, name: name || url, title: name || url, url });
    name = "";
  }
  return channels;
}

export default function PlaylistPlayer() {
  const [playlistId, setPlaylistId] = createSignal("");
  const [index, setIndex] = createSignal(0);
  const [m3u, setM3u] = createSignal("");
  const [imported, setImported] = createSignal<Channel[]>([]);
  const [message, setMessage] = createSignal("");

  const savedPlaylist = createMemo(() => appState.playlists().find((item) => item.id === playlistId()) ?? appState.playlists()[0]);
  const channels = createMemo(() => (savedPlaylist() ? savedPlaylist()!.channels : imported()));
  const current = createMemo(() => channels()[index()]);

  createEffect(
    () => playlistId(),
    () => {
      setIndex(0);
    },
  );

  const step = (direction: number) => {
    const total = channels().length;
    if (!total) return;
    setIndex((value) => (value + direction + total) % total);
  };

  const loadM3u = () => {
    const raw = m3u();
    if (raw.length > MAX_M3U_LENGTH || raw.split(/\r?\n/).length > MAX_M3U_LINES) {
      setMessage("That playlist is too large.");
      return;
    }
    const parsed = parseM3u(raw).slice(0, MAX_M3U_CHANNELS);
    if (!parsed.length) {
      setMessage("No playable streams found in that playlist.");
      return;
    }
    setImported(parsed);
    setPlaylistId("");
    setIndex(0);
    setMessage(`Loaded ${parsed.length} channel(s).`);
  };

  return (
    <>
      <PageMeta title="Playlist Player - AllTVCNL" description="Play saved playlists and pasted M3U playlists in the browser." path="/playlist-player" />
      <PageHeader title="Playlist Player" description="Play a saved library playlist or paste an M3U playlist." />

      <div class="mb-5 flex flex-wrap gap-2">
        <a class="rounded-sm bg-brand-purple px-3 py-2 text-sm font-bold text-white hover:bg-fuchsia-700" href={sitePath("/playlists")}>
          Open library
        </a>
      </div>

      <Show when={message()}>
        <p class="glass-bar mb-4 rounded-sm px-3 py-2 text-sm font-semibold text-brand-purple dark:text-fuchsia-300" role="status">{message()}</p>
      </Show>

      <div class="grid gap-5 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <section class="glass-panel overflow-hidden rounded-sm p-4 sm:p-5">
          <Show when={current()} fallback={<p class="py-16 text-center text-sm text-slate-600 dark:text-white/70">Add channels or load an M3U playlist to start playback.</p>}>
            {(channel) => (
              <>
                <div class="mb-3 flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p class="font-display text-lg font-bold">{channel().name}</p>
                    <p class="text-xs text-slate-600 dark:text-white/60">Channel {index() + 1} of {channels().length}</p>
                  </div>
                  <div class="flex gap-2">
                    <Button variant="secondary" onClick={() => step(-1)}>Previous</Button>
                    <Button variant="secondary" onClick={() => step(1)}>Next</Button>
                  </div>
                </div>
                <HlsPlayer src={channel().url ?? ""} status={channel().status} autoplay={true} />
              </>
            )}
          </Show>

          <Show when={channels().length > 0}>
            <div class="mt-4 grid gap-2 sm:grid-cols-2">
              <For each={channels()}>
                {(channel, channelIndex) => (
                  <button
                    type="button"
                    class={`truncate rounded-sm px-3 py-2 text-left text-sm font-semibold transition ${
                      channelIndex() === index() ? "bg-brand-purple text-white" : "bg-white/50 text-slate-800 hover:bg-white/75 dark:bg-slate-900/50 dark:text-white"
                    }`}
                    onClick={() => setIndex(channelIndex())}>
                    {channelIndex() + 1}. {channel.name}
                  </button>
                )}
              </For>
            </div>
          </Show>
        </section>

        <aside class="grid content-start gap-5">
          <section class="glass-panel rounded-sm p-4 sm:p-5">
            <h2 class="font-display text-lg font-bold">Saved playlists</h2>
            <Show when={appState.playlists().length > 0} fallback={<p class="mt-3 text-sm text-slate-600 dark:text-white/70">No saved playlists yet.</p>}>
              <label class="mt-3 block text-xs font-bold uppercase tracking-wide text-slate-600 dark:text-white/60" for="playlist-player-select">
                Playlist
              </label>
              <select
                id="playlist-player-select"
                class="mt-1 w-full rounded-sm border border-white/60 bg-white/70 px-3 py-2 text-sm dark:border-white/10 dark:bg-slate-900/70 dark:text-white"
                value={savedPlaylist()?.id ?? ""}
                onChange={(event) => {
                  setPlaylistId(event.currentTarget.value);
                  setImported([]);
                }}>
                <For each={appState.playlists()}>
                  {(playlist) => <option value={playlist.id}>{playlist.name} ({playlist.channels.length})</option>}
                </For>
              </select>
            </Show>
          </section>

          <section class="glass-panel rounded-sm p-4 sm:p-5">
            <h2 class="font-display text-lg font-bold">Load M3U</h2>
            <textarea
              class="mt-3 min-h-40 w-full rounded-sm border border-white/60 bg-white/70 p-3 text-xs dark:border-white/10 dark:bg-slate-900/70 dark:text-white"
              placeholder="#EXTM3U&#10;#EXTINF:-1,Example&#10;https://example.com/stream.m3u8"
              value={m3u()}
              maxlength={MAX_M3U_LENGTH}
              onInput={(event) => setM3u(event.currentTarget.value)}
            />
            <Button class="mt-3 w-full" onClick={loadM3u}>Load playlist</Button>
          </section>
        </aside>
      </div>
    </>
  );
}
