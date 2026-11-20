export const MAX_QUERY_LENGTH = 120;

export function cleanText(value: unknown, maxLength = MAX_QUERY_LENGTH): string {
  if (typeof value !== "string") return "";
  return Array.from(value)
    .filter((character) => {
      const code = character.charCodeAt(0);
      return code > 31 && code !== 127;
    })
    .join("")
    .trim()
    .slice(0, maxLength);
}
