import { describe, expect, it } from "vitest";
import { normalizeFavoriteList } from "./index";

const channel = { id: "1", name: "News", title: "News", url: "https://example.com/news.m3u8" };

describe("normalizeFavoriteList", () => {
  it("keeps array-based favorites", () => {
    expect(normalizeFavoriteList([channel])).toEqual([channel]);
  });

  it("converts the legacy URL-keyed object into an array", () => {
    expect(normalizeFavoriteList({ "https://example.com/news.m3u8": channel })).toEqual([channel]);
  });

  it("parses double-encoded JSON", () => {
    expect(normalizeFavoriteList(JSON.stringify({ "https://example.com/news.m3u8": channel }))).toEqual([channel]);
  });

  it("drops invalid entries instead of throwing", () => {
    expect(normalizeFavoriteList({ first: channel, second: null, third: "bad", fourth: [channel] })).toEqual([channel]);
  });

  it("returns an empty array for unsupported values", () => {
    expect(normalizeFavoriteList(null)).toEqual([]);
    expect(normalizeFavoriteList("not-json")).toEqual([]);
  });
});
