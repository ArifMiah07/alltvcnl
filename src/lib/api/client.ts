import { apiPath, staticAsset } from "./config";
import type { Channel, PageResult, SearchResult } from "../types";

export class ApiError extends Error {
  readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

export type QueryParams = Record<string, string | number | boolean | null | undefined>;

interface TimeoutControl {
  signal: AbortSignal;
  dispose(): void;
}

function withTimeout(signal?: AbortSignal): TimeoutControl {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(new DOMException("Request timeout", "TimeoutError")), 15000);

  const abort = () => {
    clearTimeout(timer);
    controller.abort(signal?.reason);
  };

  if (signal?.aborted) abort();
  else signal?.addEventListener("abort", abort, { once: true });

  return {
    signal: controller.signal,
    dispose: () => {
      clearTimeout(timer);
      signal?.removeEventListener("abort", abort);
    },
  };
}

async function fetchJson(url: string | URL, label: string, signal?: AbortSignal): Promise<unknown> {
  const timeout = withTimeout(signal);
  try {
    const response = await fetch(url, {
      headers: { Accept: "application/json" },
      signal: timeout.signal,
    });
    if (!response.ok) throw new ApiError(`${label} request failed with status ${response.status}`, response.status);
    return await response.json();
  } finally {
    timeout.dispose();
  }
}

function absoluteApiUrl(path: string): URL {
  const value = apiPath(path);
  if (/^https?:\/\//.test(value)) return new URL(value);
  const origin = typeof window === "undefined" ? "http://localhost" : window.location.origin;
  return new URL(value, origin === "null" ? "http://localhost" : origin);
}

async function requestLocalJson(path: string, signal?: AbortSignal): Promise<unknown> {
  return fetchJson(staticAsset(path), "Local data", signal);
}

async function withLocalFallback<T>(remote: () => Promise<T>, local: (signal?: AbortSignal) => Promise<T>, signal?: AbortSignal): Promise<T> {
  try {
    return await remote();
  } catch (error) {
    if (!signal?.aborted) return local(signal);
    throw error;
  }
}

async function requestJson(path: string, params?: QueryParams, signal?: AbortSignal): Promise<unknown> {
  const url = absoluteApiUrl(path);

  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== null && value !== "") url.searchParams.set(key, String(value));
    }
  }

  return fetchJson(url, "API", signal);
}

function record(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" ? (value as Record<string, unknown>) : {};
}

function array(value: unknown): unknown[] {
  if (Array.isArray(value)) return value;
  const nested = record(value).data;
  return Array.isArray(nested) ? nested : [];
}

function text(value: unknown, fallback = ""): string {
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

function number(value: unknown, fallback: number): number {
  const parsed = typeof value === "number" ? value : Number(value);
  return Number.isFinite(parsed) && parsed >= 0 ? Math.floor(parsed) : fallback;
}

export function normalizeChannel(raw: unknown): Channel | null {
  if (!raw || typeof raw !== "object") return null;
  const item = raw as Record<string, unknown>;
  const name = text(item.name) || text(item.title) || text(item.tittle) || "Unknown channel";
  const alternateUrls = Array.isArray(item.urls) ? item.urls.map((value) => text(value)).filter(Boolean) : [];
  const url = text(item.url) || text(item.streamUrl) || text(item.stream) || text(item.link) || alternateUrls[0] || "";
  const identifier = item.id ?? item._id ?? url;

  return {
    ...item,
    id: typeof identifier === "string" || typeof identifier === "number" ? identifier : name,
    name,
    title: name,
    url,
    logo: text(item.logo) || text(item.image) || text(item.thumbnail) || text(item["tvg-logo"]),
    group: text(item.group) || text(item.category) || text(item.country) || text(item["group-title"]),
    status: item.status === true,
  };
}

function channels(value: unknown): Channel[] {
  return array(value).map(normalizeChannel).filter((item): item is Channel => item !== null);
}

function pageResult(payload: unknown): PageResult<Channel> {
  const root = record(payload);
  return {
    items: channels(root.data),
    totalItems: number(root.totalItems ?? root.total ?? 0, 0),
    totalPages: number(root.totalPages, 1),
  };
}

function paginate(items: Channel[], currentPage: number, channelsPerPage: number): PageResult<Channel> {
  const pageSize = Math.min(Math.max(Math.floor(channelsPerPage) || 12, 1), 60);
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const page = Math.min(Math.max(Math.floor(currentPage) || 1, 1), totalPages);
  const start = (page - 1) * pageSize;
  return { items: items.slice(start, start + pageSize), totalItems: items.length, totalPages };
}

let collectedPromise: Promise<Channel[]> | undefined;

function collectedChannels(): Promise<Channel[]> {
  if (!collectedPromise) {
    collectedPromise = requestLocalJson("jsons/collected_channels_01.json")
      .then((payload) => channels(payload))
      .catch((error: unknown) => {
        collectedPromise = undefined;
        throw error;
      });
  }
  return collectedPromise;
}

function localChannels(_signal?: AbortSignal): Promise<Channel[]> {
  return collectedChannels();
}

function matchesTerm(channel: Channel, term: string): boolean {
  const needle = term.trim().toLowerCase();
  return !needle || `${channel.name} ${channel.group}`.toLowerCase().includes(needle);
}

export async function getStreams(
  params: { currentPage: number; channelsPerPage: number },
  signal?: AbortSignal,
): Promise<PageResult<Channel>> {
  return withLocalFallback(
    async () => pageResult(await requestJson("api/iptv-player/streams", params, signal)),
    async (fallbackSignal) => paginate(await localChannels(fallbackSignal), params.currentPage, params.channelsPerPage),
    signal,
  );
}

export async function getVerifiedStreams(
  params: { currentPage: number; channelsPerPage: number; search?: string; group?: string },
  signal?: AbortSignal,
): Promise<PageResult<Channel>> {
  return withLocalFallback(
    async () => pageResult(await requestJson("api/iptv-player/verified-streams", params, signal)),
    async (fallbackSignal) => {
      const items = (await localChannels(fallbackSignal)).filter(
        (channel) => matchesTerm(channel, params.search ?? "") && (!params.group || params.group === "All" || channel.group === params.group),
      );
      return paginate(items, params.currentPage, params.channelsPerPage);
    },
    signal,
  );
}

export async function getVerifiedGroups(signal?: AbortSignal): Promise<string[]> {
  return withLocalFallback(
    async () => {
      const payload = record(await requestJson("api/iptv-player/verified-streams/groups", undefined, signal));
      return array(payload.data).map((item) => text(item)).filter(Boolean);
    },
    async (fallbackSignal) => {
      const groups = new Set(
        (await localChannels(fallbackSignal))
          .map((channel) => channel.group)
          .filter((group): group is string => Boolean(group)),
      );
      return ["All", ...[...groups].sort((left, right) => left.localeCompare(right))];
    },
    signal,
  );
}

export async function searchStreams(term: string, signal?: AbortSignal): Promise<SearchResult<Channel>> {
  return withLocalFallback(
    async () => {
      const payload = record(await requestJson("api/iptv-player/testing-search-url", { term }, signal));
      return { ...pageResult(payload), currentIndexSet: number(payload.currentIndexSet, 1) };
    },
    async (fallbackSignal) => {
      const items = (await localChannels(fallbackSignal)).filter((channel) => matchesTerm(channel, term));
      return { ...paginate(items, 1, items.length || 1), currentIndexSet: 1 };
    },
    signal,
  );
}

export async function getChinaIptv(
  params: { currentPage: number; channelsPerPage: number; term?: string },
  signal?: AbortSignal,
): Promise<PageResult<Channel>> {
  return withLocalFallback(
    async () => pageResult(await requestJson("api/iptv-player/stream/china-iptv", params, signal)),
    async (fallbackSignal) => {
      const items = (await localChannels(fallbackSignal)).filter((channel) => matchesTerm(channel, params.term ?? ""));
      return paginate(items, params.currentPage, params.channelsPerPage);
    },
    signal,
  );
}

export async function getCollectedChannels(_signal?: AbortSignal): Promise<Channel[]> {
  return collectedChannels();
}

export async function getWorkingUpdates(signal?: AbortSignal): Promise<Channel[]> {
  return fetchJson(staticAsset("jsons/working_updates.json"), "Update data", signal).then((payload) => channels(payload));
}
