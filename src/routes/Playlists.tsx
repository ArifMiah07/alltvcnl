import { For, Show, createSignal } from "solid-js";
import { PageMeta } from "../components/ui/PageMeta";
import { Button } from "../components/ui/Button";
import { Input, Select } from "../components/ui/Field";
import { PageHeader } from "../features/channels/PageHeader";
import { sitePath } from "../lib/api/config";
import { appState } from "../lib/stores";
import { catalogSchema } from "../lib/seo";
import { safeMediaUrl } from "../lib/validation/url";
import { MAX_IMPORT_BYTES } from "../lib/validation/playlist";

export default function Playlists() {
  const [newName, setNewName] = createSignal("");
  const [channelName, setChannelName] = createSignal("");
  const [channelUrl, setChannelUrl] = createSignal("");
  const [targetId, setTargetId] = createSignal("");
  const [message, setMessage] = createSignal("");

  const selectedPlaylist = () => appState.playlists().find((item) => item.id === targetId()) ?? appState.playlists()[0];

  const create = () => {
    const id = appState.createPlaylist(newName());
    setNewName("");
    setTargetId(id);
    setMessage("Playlist created.");
  };

  const addChannel = () => {
    const url = safeMediaUrl(channelUrl());
    const playlist = selectedPlaylist();
    if (!playlist) {
      setMessage("Create a playlist first.");
      return;
    }
    if (!url) {
      setMessage("Enter a valid http or https stream URL.");
      return;
    }
    appState.addToPlaylist(playlist.id, {
      id: crypto.randomUUID(),
      name: channelName().trim() || "Untitled channel",
      url,
      title: channelName().trim() || "Untitled channel",
    });
    setChannelName("");
    setChannelUrl("");
    setMessage("Channel added.");
  };

  const exportAll = () => {
    const blob = new Blob([JSON.stringify(appState.playlists(), null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "alltvcnl-playlists.json";
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const importFile = async (event: Event) => {
    const input = event.currentTarget as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    if (file.size > MAX_IMPORT_BYTES) {
      setMessage("That import file is too large.");
      input.value = "";
      return;
    }
    try {
      const count = appState.importPlaylists(JSON.parse(await file.text()));
      setMessage(count ? `Imported ${count} playlist(s).` : "No valid playlists found.");
    } catch {
      setMessage("That file is not valid JSON.");
    }
    input.value = "";
  };

  return (
    <>
      <PageMeta
        title="Library - AllTVCNL"
        description="Build, export, and play custom IPTV playlists stored on your device."
        path="/playlists"
        schema={catalogSchema("Library", "Build, export, and play custom IPTV playlists stored on your device.", "/playlists")}
      />
      <PageHeader title="Library" description="Organize channels into playlists, export them as JSON, or play them." />

      <div class="mb-5 flex flex-wrap gap-2">
        <a class="rounded-sm bg-brand-purple px-3 py-2 text-sm font-bold text-white hover:bg-fuchsia-700" href={sitePath("/playlist-player")}>
          Open Playlist Player
        </a>
      </div>

      <Show when={message()}>
        <p class="glass-bar mb-4 rounded-sm px-3 py-2 text-sm font-semibold text-brand-purple dark:text-fuchsia-300" role="status">{message()}</p>
      </Show>

      <div class="grid gap-5 lg:grid-cols-2">
        <section class="glass-panel rounded-sm p-4 sm:p-5">
          <h2 class="font-bold">Create a playlist</h2>
          <div class="mt-3 flex gap-2">
            <Input value={newName()} placeholder="Playlist name" onInput={(event) => setNewName(event.currentTarget.value)} />
            <Button onClick={create} disabled={!newName().trim()}>Create</Button>
          </div>

          <h2 class="mt-6 font-bold">Add a channel</h2>
          <div class="mt-3 space-y-2">
            <Select value={targetId()} onChange={(event) => setTargetId(event.currentTarget.value)}>
              <option value="">Select playlist</option>
              <For each={appState.playlists()}>{(playlist) => <option value={playlist.id}>{playlist.name}</option>}</For>
            </Select>
            <Input value={channelName()} placeholder="Channel name" onInput={(event) => setChannelName(event.currentTarget.value)} />
            <Input value={channelUrl()} placeholder="https://example.com/stream.m3u8" onInput={(event) => setChannelUrl(event.currentTarget.value)} />
            <Button onClick={addChannel}>Add channel</Button>
          </div>
        </section>

        <section class="glass-panel rounded-sm p-4 sm:p-5">
          <div class="flex items-center justify-between gap-2">
            <h2 class="font-bold">Your playlists</h2>
            <div class="flex gap-2">
              <Button variant="secondary" onClick={exportAll} disabled={!appState.playlists().length}>Export</Button>
              <label class="secondary-btn cursor-pointer rounded-sm border border-white/60 bg-white/50 px-3 py-2 text-sm font-semibold text-slate-900 backdrop-blur dark:border-white/10 dark:bg-slate-900/55 dark:text-white">
                Import
                <input type="file" accept="application/json" class="hidden" onChange={importFile} />
              </label>
            </div>
          </div>

          <Show when={appState.playlists().length > 0} fallback={<p class="mt-4 text-sm text-slate-700 dark:text-white/60">No playlists yet.</p>}>
            <div class="mt-4 space-y-3">
              <For each={appState.playlists()}>
                {(playlist) => (
                  <article class="rounded-sm border border-white/55 bg-white/30 p-3 dark:border-white/10 dark:bg-slate-950/30">
                    <div class="flex items-center gap-2">
                      <Input
                        value={playlist.name}
                        aria-label="Playlist name"
                        onInput={(event) => appState.renamePlaylist(playlist.id, event.currentTarget.value)}
                      />
                      <Button variant="danger" aria-label={`Delete ${playlist.name}`} onClick={() => appState.deletePlaylist(playlist.id)}>Delete</Button>
                    </div>
                    <p class="mt-2 text-xs font-medium text-slate-700 dark:text-white/60">{playlist.channels.length} channel(s)</p>
                    <ul class="mt-2 space-y-1">
                      <For each={playlist.channels}>
                        {(channel) => (
                          <li class="flex items-center justify-between gap-2 text-sm">
                            <span class="truncate">{channel.name}</span>
                            <button
                              type="button"
                              class="text-xs font-semibold text-rose-600 hover:underline"
                              onClick={() => appState.removeFromPlaylist(playlist.id, channel)}>
                              Remove
                            </button>
                          </li>
                        )}
                      </For>
                    </ul>
                  </article>
                )}
              </For>
            </div>
          </Show>
        </section>
      </div>
    </>
  );
}
