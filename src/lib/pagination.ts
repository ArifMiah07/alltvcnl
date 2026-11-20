export function clampPage(value: unknown, totalPages: number): number {
  const page = Number(value);
  if (!Number.isFinite(page)) return 1;
  return Math.min(Math.max(Math.floor(page), 1), Math.max(totalPages, 1));
}

export function clampPageSize(value: unknown, fallback = 12): number {
  const size = Number(value);
  if (!Number.isFinite(size)) return fallback;
  return Math.min(Math.max(Math.floor(size), 1), 200);
}

export function paginate<T>(items: readonly T[], page: number, pageSize: number): T[] {
  const start = (Math.max(page, 1) - 1) * pageSize;
  return items.slice(start, start + pageSize);
}

export function pageNumbers(current: number, total: number, max = 10): number[] {
  const pages = Math.max(total, 1);
  const currentPage = clampPage(current, pages);
  const limit = Math.min(Math.max(Math.floor(max), 1), pages);
  let start = Math.max(1, currentPage - Math.floor(limit / 2));
  let end = start + limit - 1;
  if (end > pages) {
    end = pages;
    start = Math.max(1, end - limit + 1);
  }
  const result: number[] = [];
  for (let page = start; page <= end; page += 1) result.push(page);
  return result;
}
