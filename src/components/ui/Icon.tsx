export type IconName =
  | "search"
  | "bookmark"
  | "bookmark-filled"
  | "play"
  | "moon"
  | "sun"
  | "menu"
  | "close"
  | "chevron-left"
  | "chevron-right"
  | "chevron-down"
  | "chevron-up"
  | "grid"
  | "list"
  | "external"
  | "trash"
  | "plus"
  | "check"
  | "refresh"
  | "alert"
  | "heart"
  | "list-plus";

const paths: Record<IconName, string> = {
  search: "m21 21-4.35-4.35m2.1-5.65a7.75 7.75 0 1 1-15.5 0 7.75 7.75 0 0 1 15.5 0Z",
  bookmark: "M6 4.75A1.75 1.75 0 0 1 7.75 3h8.5A1.75 1.75 0 0 1 18 4.75V21l-6-4-6 4V4.75Z",
  "bookmark-filled": "M6 4.75A1.75 1.75 0 0 1 7.75 3h8.5A1.75 1.75 0 0 1 18 4.75V21l-6-4-6 4V4.75Z",
  play: "M8 5.14v13.72a1 1 0 0 0 1.54.84l10.3-6.86a1 1 0 0 0 0-1.68L9.54 4.3A1 1 0 0 0 8 5.14Z",
  moon: "M20.7 14.3A8.5 8.5 0 0 1 9.7 3.3a8.5 8.5 0 1 0 11 11Z",
  sun: "M12 4V2m0 20v-2m8-8h2M2 12h2m13.66-5.66 1.41-1.41M4.93 19.07l1.41-1.41m0-11.32L4.93 5.93m14.14 14.14-1.41-1.41M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Z",
  menu: "M4 6h16M4 12h16M4 18h16",
  close: "M18 6 6 18M6 6l12 12",
  "chevron-left": "m15 18-6-6 6-6",
  "chevron-right": "m9 18 6-6-6-6",
  "chevron-down": "m6 9 6 6 6-6",
  "chevron-up": "m6 15 6-6 6 6",
  grid: "M4 4h6v6H4V4Zm10 0h6v6h-6V4ZM4 14h6v6H4v-6Zm10 0h6v6h-6v-6Z",
  list: "M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01",
  external: "M14 4h6v6m0-6-9 9m5 7H5V9m0 10 7-7",
  trash: "M4 7h16M9 7V4h6v3m-9 0 1 14h10l1-14M10 11v6m4-6v6",
  plus: "M12 5v14M5 12h14",
  check: "m5 13 4 4L19 7",
  refresh: "M20 11a8 8 0 1 0-2.34 6.66M20 4v7h-7",
  alert: "M12 9v4m0 4h.01M10.3 3.9 2.7 17a2 2 0 0 0 1.72 3h15.16a2 2 0 0 0 1.72-3L13.7 3.9a2 2 0 0 0-3.4 0Z",
  heart: "M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.7-7.5 1.1-1.1a5.5 5.5 0 0 0 0-7.8Z",
  "list-plus": "M8 6h13M8 12h8M8 18h8M3 6h.01M3 12h.01M3 18h.01M18 15v6m-3-3h6",
};

const filled: IconName[] = ["bookmark-filled", "play"];

export function Icon(props: { name: IconName; size?: number; class?: string }) {
  return (
    <svg
      class={`shrink-0 ${props.class ?? ""}`}
      width={props.size ?? 18}
      height={props.size ?? 18}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.8"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true">
      <path d={paths[props.name]} fill={filled.includes(props.name) ? "currentColor" : "none"} />
    </svg>
  );
}
