import { describe, expect, it } from "vitest";
import { cleanText, MAX_QUERY_LENGTH } from "./text";

describe("cleanText", () => {
  it("strips control characters and trims", () => {
    expect(cleanText("  News\u0000\u001f  ")).toBe("News");
  });

  it("caps length", () => {
    expect(cleanText("x".repeat(500))).toHaveLength(MAX_QUERY_LENGTH);
  });

  it("handles non-strings", () => {
    expect(cleanText(null)).toBe("");
    expect(cleanText(42)).toBe("");
  });
});
