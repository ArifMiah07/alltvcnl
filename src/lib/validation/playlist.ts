import type { Channel, Playlist } from "../types";
import { cleanText } from "./text";
import { safeMediaUrl } from "./url";

export const MAX_PLAYLISTS = 200;
export const MAX_CHANNELS_PER_PLAYLIST = 500;
export const MAX_FAVORITES = 2000;
export const MAX_IMPORT_BYTES = 5 * 1024 * 1024;
export const MAX_M3U_LENGTH = 1024 * 1024;
export const MAX_M3U_LINES = 5000;
export const MAX_M3U_CHANNELS = 500;

function record(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as Record<string, unknown>) : {};
}

function timestamp(value: unknown): number {
  return typeof value === "number" && Number.isFinite(value) && value > 0 ? Math.floor(value) : Date.now();
}

function identifier(value: unknown, fallback: string): string {
  if (typeof value === "string" && value.trim()) return cleanText(value, 200);
  if (typeof value === "number" && Number.isFinite(value)) return String(value);
  return fallback;
}

export function normalizeChannel(value: unknown): Channel | null {
  const item = record(value);
  const url = safeMediaUrl(item.url ?? item.streamUrl ?? item.stream ?? item.link);
  if (!url) return null;

  const name = cleanText(item.name ?? item.title ?? item.tittle, 160) || "Untitled channel";
  const channel: Channel = {
    id: identifier(item.id ?? item._id, url),
    name,
    title: name,
    url,
  };

  const logo = safeMediaUrl(item.logo ?? item.image ?? item.thumbnail);
  const group = cleanText(item.group ?? item["group-title"], 160);
  const category = cleanText(item.category, 160) || group;
  const country = cleanText(item.country, 120);
  const feed = cleanText(item.feed, 160);
  const quality = cleanText(item.quality, 80);

  if (logo) channel.logo = logo;
  if (group) channel.group = group;
  if (category) channel.category = category;
  if (country) channel.country = country;
  if (feed) channel.feed = feed;
  if (quality) channel.quality = quality;
  if (item.status !== undefined) channel.status = item.status === true;

  return channel;
}

export function normalizeChannelList(raw: unknown, max = MAX_CHANNELS_PER_PLAYLIST): Channel[] {
  if (!Array.isArray(raw)) return [];
  const seen = new Set<string>();
  const channels: Channel[] = [];
  for (const item of raw) {
    const channel = normalizeChannel(item);
    if (!channel) continue;
    const key = String(channel.id ?? channel.url);
    if (seen.has(key)) continue;
    seen.add(key);
    channels.push(channel);
    if (channels.length >= max) break;
  }
  return channels;
}

export function normalizePlaylist(raw: unknown): Playlist | null {
  const item = record(raw);
  const id = identifier(item.id, crypto.randomUUID());
  const name = cleanText(item.name, 120) || "Imported playlist";
  return {
    id,
    name,
    channels: normalizeChannelList(item.channels, MAX_CHANNELS_PER_PLAYLIST),
    createdAt: timestamp(item.createdAt),
    updatedAt: timestamp(item.updatedAt),
  };
}

export function normalizePlaylists(raw: unknown, max = MAX_PLAYLISTS): Playlist[] {
  if (!Array.isArray(raw)) return [];
  const playlists: Playlist[] = [];
  for (const item of raw) {
    const playlist = normalizePlaylist(item);
    if (!playlist) continue;
    playlists.push(playlist);
    if (playlists.length >= max) break;
  }
  return playlists;
}

export function normalizeFavorites(raw: unknown): Channel[] {
  let value = raw;
  if (typeof value === "string") {
    try {
      value = JSON.parse(value);
    } catch {
      return [];
    }
  }
  if (value && !Array.isArray(value) && typeof value === "object") value = Object.values(value as Record<string, unknown>);
  return normalizeChannelList(value, MAX_FAVORITES);
}
