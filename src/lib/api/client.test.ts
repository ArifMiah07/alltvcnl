import { afterEach, describe, expect, it, vi } from "vitest";
import { getStreams, normalizeChannel } from "./client";

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("api client", () => {
  it("normalizes backend channel shapes", () => {
    expect(
      normalizeChannel({
        _id: "1",
        tittle: "Legacy Name",
        streamUrl: "https://example.com/live.m3u8",
        category: "News",
      }),
    ).toMatchObject({
      id: "1",
      name: "Legacy Name",
      title: "Legacy Name",
      url: "https://example.com/live.m3u8",
      group: "News",
    });
  });

  it("requests and maps paginated streams", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(
        JSON.stringify({
          data: [{ id: "1", name: "Test", url: "https://example.com/test.m3u8" }],
          total: 1,
          totalPages: 1,
        }),
        { status: 200, headers: { "content-type": "application/json" } },
      ),
    );
    vi.stubGlobal("fetch", fetchMock);

    const result = await getStreams({ currentPage: 1, channelsPerPage: 12 });

    expect(String(fetchMock.mock.calls[0]?.[0])).toContain("api/iptv-player/streams");
    expect(result).toEqual({ items: [expect.objectContaining({ name: "Test" })], totalItems: 1, totalPages: 1 });
  });
});
