import { describe, expect, it } from "vitest";
import { backgroundSrcSet, heroSrcSet, responsiveSrc } from "./images";

describe("responsive images", () => {
  it("builds hero variants", () => {
    expect(heroSrcSet("/hero/test")).toBe("/hero/test-sm.webp 720w, /hero/test-md.webp 1280w, /hero/test-lg.webp 1920w");
  });

  it("builds background variants", () => {
    expect(backgroundSrcSet("/background/test")).toBe("/background/test-sm.webp 480w, /background/test-md.webp 1280w, /background/test-lg.webp 1920w");
  });

  it("uses the medium image as fallback", () => {
    expect(responsiveSrc("/hero/test")).toBe("/hero/test-md.webp");
  });
});
