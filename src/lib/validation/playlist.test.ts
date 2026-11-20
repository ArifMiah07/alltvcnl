import { describe, expect, it } from "vitest";
import { MAX_CHANNELS_PER_PLAYLIST, normalizeChannel, normalizePlaylists } from "./playlist";

describe("playlist validation", () => {
  it("normalizes valid channels and drops unusable entries", () => {
    expect(normalizeChannel({ name: "News", url: "https://example.com/news.m3u8" })).toMatchObject({
      id: "https://example.com/news.m3u8",
      name: "News",
      url: "https://example.com/news.m3u8",
    });
    expect(normalizeChannel(null)).toBeNull();
    expect(normalizeChannel({ name: "Broken", url: "javascript:alert(1)" })).toBeNull();
  });

  it("rejects malformed playlist data", () => {
    expect(normalizePlaylists(null)).toEqual([]);
    expect(
      normalizePlaylists([
        { id: "x", name: "Valid", channels: [{ name: "News", url: "https://example.com/news.m3u8" }] },
        { id: "y", name: "Broken", channels: [null, "bad"] },
      ]),
    ).toHaveLength(2);
  });

  it("caps channel counts", () => {
    const channels = Array.from({ length: MAX_CHANNELS_PER_PLAYLIST + 10 }, (_, index) => ({
      name: `Channel ${index}`,
      url: `https://example.com/${index}.m3u8`,
    }));
    const playlists = normalizePlaylists([{ id: "x", name: "Large", channels }]);
    expect(playlists[0].channels).toHaveLength(MAX_CHANNELS_PER_PLAYLIST);
  });
});
