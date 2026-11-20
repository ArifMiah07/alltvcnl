import { createEffect, createMemo, createSignal } from "solid-js";
import type { Channel, Playlist } from "./types";
import { LEGACY_KEYS, normalizeFavoriteList, readJson, readMigratedJson, readMigratedNumber, readMigratedString, readString, writeJson, writeString } from "./storage";
import { MAX_CHANNELS_PER_PLAYLIST, MAX_PLAYLISTS, normalizePlaylists } from "./validation/playlist";

const [theme, setTheme] = createSignal<"light" | "dark">(readString("alltvcnl.theme.v1") === "dark" ? "dark" : "light");
const [channelsPerPage, setChannelsPerPage] = createSignal(
  readMigratedNumber("alltvcnl.channelsPerPage.v1", LEGACY_KEYS.channelsPerPage, 1, 200, 12),
);
const [favorites, setFavoritesState] = createSignal<Channel[]>(
  normalizeFavoriteList(readMigratedJson<unknown>("alltvcnl.favorites.v1", LEGACY_KEYS.favorites, [])),
);
const setFavorites = (value: Channel[] | ((current: Channel[]) => Channel[])): void => {
  setFavoritesState((current) => normalizeFavoriteList(typeof value === "function" ? value(current) : value));
};
const [playlists, setPlaylists] = createSignal<Playlist[]>(normalizePlaylists(readJson<unknown>("alltvcnl.playlists.v1", [])));
const [collectedSearch, setCollectedSearch] = createSignal(
  readMigratedString("alltvcnl.collectedSearch.v1", LEGACY_KEYS.collectedSearch),
);
const [videoCards, setVideoCards] = createSignal(
  readMigratedString("alltvcnl.videoCards.v1", LEGACY_KEYS.videoCards, "false") === "true",
);
let persistenceInitialized = false;

export function initializeAppState(): void {
  if (persistenceInitialized) return;
  persistenceInitialized = true;

  createEffect(
    () => theme(),
    (value) => {
      document.documentElement.classList.toggle("dark", value === "dark");
      writeString("alltvcnl.theme.v1", value);
    },
  );

  createEffect(
    () => channelsPerPage(),
    (value) => writeString("alltvcnl.channelsPerPage.v1", String(value)),
  );

  createEffect(
    () => favorites(),
    (value) => writeJson("alltvcnl.favorites.v1", value),
  );

  createEffect(
    () => playlists(),
    (value) => writeJson("alltvcnl.playlists.v1", value),
  );

  createEffect(
    () => collectedSearch(),
    (value) => writeString("alltvcnl.collectedSearch.v1", value),
  );

  createEffect(
    () => videoCards(),
    (value) => writeString("alltvcnl.videoCards.v1", String(value)),
  );
}

function channelKey(channel: Channel): string {
  return String(channel.id || channel.url || channel.name || "");
}

function isFavorite(channel: Channel): boolean {
  const key = channelKey(channel);
  return favorites().some((item) => channelKey(item) === key);
}

function toggleFavorite(channel: Channel): void {
  const key = channelKey(channel);
  setFavorites((current) =>
    current.some((item) => channelKey(item) === key)
      ? current.filter((item) => channelKey(item) !== key)
      : [...current, channel],
  );
}

function removeFavorite(channel: Channel): void {
  const key = channelKey(channel);
  setFavorites((current) => current.filter((item) => channelKey(item) !== key));
}

function createPlaylist(name: string): string {
  const id = crypto.randomUUID();
  const now = Date.now();
  setPlaylists((current) =>
    current.length >= MAX_PLAYLISTS ? current : [...current, { id, name: name.trim().slice(0, 120) || "Untitled playlist", channels: [], createdAt: now, updatedAt: now }],
  );
  return id;
}

function renamePlaylist(id: string, name: string): void {
  setPlaylists((current) => current.map((item) => (item.id === id ? { ...item, name, updatedAt: Date.now() } : item)));
}

function deletePlaylist(id: string): void {
  setPlaylists((current) => current.filter((item) => item.id !== id));
}

function addToPlaylist(id: string, channel: Channel): void {
  setPlaylists((current) =>
    current.map((item) =>
      item.id === id && item.channels.length < MAX_CHANNELS_PER_PLAYLIST && !item.channels.some((existing) => channelKey(existing) === channelKey(channel))
        ? { ...item, channels: [...item.channels, channel], updatedAt: Date.now() }
        : item,
    ),
  );
}

function removeFromPlaylist(id: string, channel: Channel): void {
  setPlaylists((current) =>
    current.map((item) =>
      item.id === id
        ? { ...item, channels: item.channels.filter((existing) => channelKey(existing) !== channelKey(channel)), updatedAt: Date.now() }
        : item,
    ),
  );
}

function importPlaylists(raw: unknown): number {
  const incoming = normalizePlaylists(raw);
  if (!incoming.length) return 0;
  setPlaylists((current) => {
    const byId = new Map(current.map((item) => [item.id, item]));
    for (const item of incoming) byId.set(item.id, item);
    return [...byId.values()].slice(0, MAX_PLAYLISTS);
  });
  return incoming.length;
}

const favoriteKeys = createMemo(() => new Set(favorites().map(channelKey)));

export const appState = {
  theme,
  setTheme,
  toggleTheme: () => setTheme((current) => (current === "dark" ? "light" : "dark")),
  channelsPerPage,
  setChannelsPerPage,
  favorites,
  setFavorites,
  favoriteKeys,
  isFavorite,
  toggleFavorite,
  removeFavorite,
  playlists,
  createPlaylist,
  renamePlaylist,
  deletePlaylist,
  addToPlaylist,
  removeFromPlaylist,
  importPlaylists,
  collectedSearch,
  setCollectedSearch,
  videoCards,
  setVideoCards,
  toggleVideoCards: () => setVideoCards((current) => !current),
};
