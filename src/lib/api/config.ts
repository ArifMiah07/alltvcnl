const PROD_API_BASE_URL = "https://iptv-player-server.vercel.app";
const DEV_API_BASE_URL = "/dev-api";
const PROD_SITE_URL = "https://alltvcnl.netlify.app";
const DEV_SITE_URL = "http://localhost:5173";

const configuredApi = import.meta.env.VITE_API_BASE_URL?.trim();
const configuredSite = import.meta.env.VITE_SITE_URL?.trim();

export const API_BASE_URL = (configuredApi || (import.meta.env.DEV ? DEV_API_BASE_URL : PROD_API_BASE_URL)).replace(/\/+$/, "");
export const SITE_URL = (configuredSite || (import.meta.env.DEV ? DEV_SITE_URL : PROD_SITE_URL)).replace(/\/+$/, "");
export const IS_ELECTRON = import.meta.env.MODE === "electron";

export function apiPath(path: string): string {
  return `${API_BASE_URL}/${path.replace(/^\/+/, "")}`;
}

export function staticAsset(path: string): string {
  const base = import.meta.env.BASE_URL || "/";
  return `${base.replace(/\/$/, "")}/${path.replace(/^\/+/, "")}`;
}

export function sitePath(path: string): string {
  if (IS_ELECTRON) return `#${path}`;
  return path;
}
