import { For, Show, createSignal } from "solid-js";
import { useSearchParams } from "@solidjs/router";
import { PageMeta } from "../components/ui/PageMeta";
import { Button } from "../components/ui/Button";
import { Select } from "../components/ui/Field";
import { EmptyState } from "../components/ui/State";
import { PageHeader } from "../features/channels/PageHeader";
import { HlsPlayer } from "../features/player/HlsPlayer";
import { appState } from "../lib/stores";
import { safeMediaUrl } from "../lib/validation/url";
import { cleanText } from "../lib/validation/text";
import { Icon } from "../components/ui/Icon";

export default function Watch() {
  const [searchParams] = useSearchParams();
  const [playlistId, setPlaylistId] = createSignal("");
  const [message, setMessage] = createSignal("");
  const src = () => safeMediaUrl(searchParams.url);
  const title = () => cleanText(searchParams.title, 120) || "Live channel";
  const status = () => searchParams.status === "true";
  const channel = () => ({ id: src(), name: title(), title: title(), url: src(), status: status() });

  const saveToPlaylist = () => {
    const playlist = appState.playlists().find((item) => item.id === playlistId()) ?? appState.playlists()[0];
    if (!playlist || !src()) {
      setMessage("Create a playlist first.");
      return;
    }
    appState.addToPlaylist(playlist.id, channel());
    setMessage(`Saved to ${playlist.name}.`);
  };

  return (
    <>
      <PageMeta title={`${title()} - Live Stream - AllTVCNL`} description={`Watch ${title()} live with the lightweight AllTVCNL HLS player.`} path="/watch" noindex />
      <PageHeader title={title()} description="One active stream, quality selection, and no background players." />

      <Show when={src()} fallback={<EmptyState title="No stream selected" message="Open a channel from any list to start watching." />}>
        {(url) => (
          <>
            <HlsPlayer src={url()} status={status()} autoplay />
            <div class="mt-4 flex flex-wrap items-center gap-2">
              <Button variant="secondary" onClick={() => appState.toggleFavorite(channel())}>
                <Icon name={appState.isFavorite(channel()) ? "bookmark-filled" : "bookmark"} size={16} />
                {appState.isFavorite(channel()) ? "Remove favorite" : "Save favorite"}
              </Button>
              <Select value={playlistId()} onChange={(event) => setPlaylistId(event.currentTarget.value)}>
                <option value="">Select playlist</option>
                <For each={appState.playlists()}>{(playlist) => <option value={playlist.id}>{playlist.name}</option>}</For>
              </Select>
              <Button variant="secondary" onClick={saveToPlaylist}>Add to playlist</Button>
              <Show when={message()}>
                <span class="text-sm text-emerald-700 dark:text-emerald-400" role="status">{message()}</span>
              </Show>
            </div>
          </>
        )}
      </Show>
    </>
  );
}
