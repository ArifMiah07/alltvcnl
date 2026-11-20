import { describe, expect, it } from "vitest";
import { isPrivateHost, isSameOrigin, safeHref, safeMediaUrl, safeUrl } from "./url";

describe("url validation", () => {
  it("allows valid http and https URLs", () => {
    expect(safeUrl("https://example.com/stream.m3u8")?.hostname).toBe("example.com");
    expect(safeMediaUrl("http://localhost:5000/api")).toBe("http://localhost:5000/api");
  });

  it("rejects dangerous protocols and credentials", () => {
    expect(safeUrl("javascript:alert(1)")).toBeNull();
    expect(safeUrl("file:///etc/passwd")).toBeNull();
    expect(safeUrl("https://user:pass@example.com")).toBeNull();
    expect(safeMediaUrl("javascript:alert(1)")).toBe("");
  });

  it("validates hrefs and same-origin checks", () => {
    expect(safeHref("/relative/path")).toBe("https://alltvcnl.netlify.app/relative/path");
    expect(isSameOrigin("https://example.com/a", "https://example.com")).toBe(true);
    expect(isSameOrigin("https://other.com/a", "https://example.com")).toBe(false);
  });

  it("detects private and loopback hosts", () => {
    expect(isPrivateHost("localhost")).toBe(true);
    expect(isPrivateHost("127.0.0.1")).toBe(true);
    expect(isPrivateHost("192.168.1.20")).toBe(true);
    expect(isPrivateHost("10.1.2.3")).toBe(true);
    expect(isPrivateHost("172.20.0.1")).toBe(true);
    expect(isPrivateHost("[::1]")).toBe(true);
    expect(isPrivateHost("8.8.8.8")).toBe(false);
    expect(isPrivateHost("example.com")).toBe(false);
  });
});
