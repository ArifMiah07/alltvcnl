import { describe, expect, it } from "vitest";
import { clampPage, clampPageSize, pageNumbers, paginate } from "./pagination";

describe("pagination", () => {
  it("clamps pages and sizes", () => {
    expect(clampPage(0, 5)).toBe(1);
    expect(clampPage(9, 5)).toBe(5);
    expect(clampPageSize(999)).toBe(200);
    expect(clampPageSize(999, 12, 24)).toBe(24);
    expect(clampPageSize(1)).toBe(1);
  });

  it("paginates arrays", () => {
    const values = [1, 2, 3, 4, 5];
    expect(paginate(values, 2, 2)).toEqual([3, 4]);
    expect(paginate(values, 9, 2)).toEqual([]);
  });

  it("builds ten-button page lists", () => {
    expect(pageNumbers(1, 3)).toEqual([1, 2, 3]);
    expect(pageNumbers(5, 20)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    expect(pageNumbers(15, 20)).toEqual([10, 11, 12, 13, 14, 15, 16, 17, 18, 19]);
  });
});
