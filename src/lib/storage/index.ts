import type { Channel } from "../types";
import { normalizeFavorites } from "../validation/playlist";
import { LEGACY_KEYS } from "./keys";

function storage(): Storage | null {
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

export function readString(key: string, fallback = ""): string {
  const store = storage();
  if (!store) return fallback;
  try {
    return store.getItem(key) ?? fallback;
  } catch {
    return fallback;
  }
}

export function writeString(key: string, value: string): void {
  const store = storage();
  if (!store) return;
  try {
    store.setItem(key, value);
  } catch {
    return;
  }
}

export function removeKey(key: string): void {
  const store = storage();
  if (!store) return;
  try {
    store.removeItem(key);
  } catch {
    return;
  }
}

export function readJson<T>(key: string, fallback: T): T {
  const raw = readString(key);
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function writeJson<T>(key: string, value: T): void {
  writeString(key, JSON.stringify(value));
}

export function readNumber(key: string, min: number, max: number, fallback: number): number {
  const raw = readString(key);
  const value = Number(raw);
  if (!raw || !Number.isFinite(value)) return fallback;
  return Math.min(max, Math.max(min, Math.floor(value)));
}

export function readMigratedString(key: string, legacyKeys: readonly string[], fallback = ""): string {
  const current = readString(key);
  if (current) return current;
  for (const legacy of legacyKeys) {
    const value = readString(legacy);
    if (value) {
      writeString(key, value);
      removeKey(legacy);
      return value;
    }
  }
  return fallback;
}

export function readMigratedJson<T>(key: string, legacyKeys: readonly string[], fallback: T): T {
  const current = readString(key);
  if (current) return readJson(key, fallback);
  for (const legacy of legacyKeys) {
    const raw = readString(legacy);
    if (raw) {
      const value = readJson<T>(legacy, fallback);
      writeJson(key, value);
      removeKey(legacy);
      return value;
    }
  }
  return fallback;
}

export function normalizeFavoriteList(raw: unknown): Channel[] {
  return normalizeFavorites(raw);
}

export function readMigratedNumber(
  key: string,
  legacyKeys: readonly string[],
  min: number,
  max: number,
  fallback: number,
): number {
  const current = readString(key);
  if (current) return readNumber(key, min, max, fallback);
  for (const legacy of legacyKeys) {
    const raw = readString(legacy);
    if (raw) {
      const value = readNumber(legacy, min, max, fallback);
      writeString(key, String(value));
      removeKey(legacy);
      return value;
    }
  }
  return fallback;
}

export { LEGACY_KEYS };
