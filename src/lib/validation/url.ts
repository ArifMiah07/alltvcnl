const HTTP_PROTOCOLS = new Set(["http:", "https:"]);
const isDev = import.meta.env.DEV;

export function isPrivateHost(hostname: string): boolean {
  const host = hostname.toLowerCase().replace(/^\[|\]$/g, "");
  if (host === "localhost" || host.endsWith(".localhost") || host.endsWith(".local") || host.endsWith(".internal")) return true;
  if (host === "::1" || host === "0:0:0:0:0:0:0:1") return true;
  if (/^f[cd][0-9a-f:]+$/i.test(host)) return true;
  if (/^fe[89ab][0-9a-f:]+$/i.test(host)) return true;

  const parts = host.split(".");
  if (parts.length !== 4 || !parts.every((part) => /^\d{1,3}$/.test(part))) return false;
  const [a, b] = parts.map(Number);
  if ([a, b].some((value) => !Number.isInteger(value) || value < 0 || value > 255)) return false;
  return (
    a === 0 ||
    a === 10 ||
    a === 127 ||
    (a === 100 && b >= 64 && b <= 127) ||
    (a === 169 && b === 254) ||
    (a === 172 && b >= 16 && b <= 31) ||
    (a === 192 && b === 168)
  );
}

export function safeUrl(value: unknown, base = "https://alltvcnl.netlify.app"): URL | null {
  if (typeof value !== "string" || !value.trim()) return null;
  try {
    const url = new URL(value.trim(), base);
    if (!HTTP_PROTOCOLS.has(url.protocol)) return null;
    if (url.username || url.password) return null;
    if (!isDev && isPrivateHost(url.hostname)) return null;
    return url;
  } catch {
    return null;
  }
}

export function safeHref(value: unknown): string | undefined {
  const url = safeUrl(value);
  return url?.toString();
}

export function safeMediaUrl(value: unknown): string {
  return safeUrl(value)?.toString() ?? "";
}

export function isSameOrigin(value: unknown, origin: string): boolean {
  const url = safeUrl(value, origin);
  return url?.origin === origin;
}
