import { For, Loading, Show, createEffect, createSignal, isPending, onSettled } from "solid-js";
import type { JSX } from "@solidjs/web";
import { useLocation } from "@solidjs/router";
import { Icon } from "../ui/Icon";
import { appState } from "../../lib/stores";
import { trackPageView } from "../../lib/analytics";
import { sitePath } from "../../lib/api/config";

const links = [
  { href: "/home", label: "Home" },
  { href: "/streams", label: "Streams" },
  { href: "/verified", label: "Verified" },
  { href: "/search", label: "Search" },
  { href: "/favorites", label: "Favorites" },
  { href: "/playlists", label: "Library" },
  { href: "/china", label: "China IPTV" },
  { href: "/collected", label: "Collected" },
  { href: "/about", label: "About" },
];

const backgrounds = [
  "/background/choose/coral-20080-16x9.webp",
  "/background/choose/aura-50749-16x9.webp",
  "/background/choose/terrain-3321-16x9.webp",
  "/background/choose/whorl-61437-16x9.webp",
];

export function AppLayout(props: { children?: JSX.Element }) {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = createSignal(false);
  const [scrolled, setScrolled] = createSignal(false);
  const pathname = () => location.pathname.replace(/\/$/, "") || "/";
  const navigating = () => isPending(() => location.pathname);
  const isFullBleed = () => pathname() === "/" || pathname() === "/home";

  createEffect(
    () => `${location.pathname}${location.search}`,
    (path) => trackPageView(path),
  );
  const background = () => backgrounds[Math.floor(new Date().getHours() / 6)];

  onSettled(() => {
    const handleScroll = () => {
      const next = window.scrollY > 120;
      if (next !== scrolled()) setScrolled(next);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  });

  const linkClass = (href: string) =>
    `mx-0.5 rounded px-2.5 py-1.5 text-[13px] font-semibold transition-colors xl:text-sm ${
      pathname() === href
        ? "border border-white/50 bg-brand-purple text-white shadow-md dark:border-white/10"
        : "text-slate-900 hover:bg-brand-purple hover:text-white dark:text-white"
    }`;

  return (
    <div class="relative flex min-h-screen w-full flex-col overflow-x-hidden">
      <div
        class="pointer-events-none fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ "background-image": `url('${background()}')` }}
        aria-hidden="true"
      />
      <div class="pointer-events-none fixed inset-0 z-0 bg-white/55 backdrop-blur-[1px] dark:bg-[#0d0714]/80" aria-hidden="true" />

      <header class="sticky top-0 z-40 w-full px-2 pt-2 sm:px-4">
        <div
          class={`glass-bar mx-auto flex items-center gap-2 transition-all duration-300 ${
            scrolled()
              ? "max-w-5xl rounded-full px-3 py-1.5 sm:px-4"
              : "max-w-7xl rounded-2xl px-3 py-2.5 sm:px-4"
          }`}>
          <a class="flex shrink-0 items-center gap-2 rounded px-1 py-1 font-display text-lg font-bold tracking-tight text-slate-900 dark:text-white" href={sitePath("/")}>
            <span class="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-brand-purple via-fuchsia-600 to-brand-blue text-white shadow-md">
              <Icon name="play" size={16} />
            </span>
            <span class="hidden sm:inline">IPTV Player</span>
          </a>

          <nav class="ml-2 hidden flex-1 items-center justify-center lg:flex" aria-label="Primary navigation">
            <For each={links.slice(0, 6)}>
              {(link) => (
                <a class={`${linkClass(link.href)} ${link.href === "/china" || link.href === "/collected" ? "hidden xl:inline-block" : ""}`} href={sitePath(link.href)}>
                  {link.label}
                </a>
              )}
            </For>
            <For each={links.slice(6, 8)}>
              {(link) => (
                <a class={`${linkClass(link.href)} hidden xl:inline-block`} href={sitePath(link.href)}>
                  {link.label}
                </a>
              )}
            </For>
            <a class={`${linkClass("/about")} hidden xl:inline-block`} href={sitePath("/about")}>
              About
            </a>
          </nav>

          <div class="ml-auto flex shrink-0 items-center gap-1.5">
            <a
              class="hidden rounded px-2 py-1.5 text-sm font-semibold text-slate-900 transition-colors hover:bg-brand-purple hover:text-white dark:text-white xl:inline-block"
              href="https://arif-miah-portfolio.vercel.app"
              target="_blank"
              rel="noopener noreferrer">
              Portfolio
            </a>
            <button
              type="button"
              class="rounded-full border border-white/50 bg-white/35 p-2 text-slate-900 transition hover:bg-brand-purple hover:text-white dark:border-white/10 dark:bg-slate-900/40 dark:text-white"
              aria-label={appState.theme() === "dark" ? "Switch to light theme" : "Switch to dark theme"}
              onClick={() => appState.toggleTheme()}>
              <Icon name={appState.theme() === "dark" ? "sun" : "moon"} size={17} />
            </button>
            <button
              type="button"
              class="rounded-full border border-white/50 bg-white/35 p-2 text-slate-900 transition hover:bg-brand-purple hover:text-white lg:hidden dark:border-white/10 dark:bg-slate-900/40 dark:text-white"
              aria-label="Toggle navigation"
              aria-expanded={menuOpen() ? "true" : "false"}
              onClick={() => setMenuOpen((open) => !open)}>
              <Icon name={menuOpen() ? "close" : "menu"} size={17} />
            </button>
          </div>
        </div>

        <Show when={menuOpen()}>
          <nav class="glass-bar mx-auto mt-2 grid max-w-7xl grid-cols-2 gap-1 rounded-2xl p-2 lg:hidden" aria-label="Mobile navigation">
            <For each={links}>
              {(link) => (
                <a
                  class={`rounded px-3 py-2 text-sm font-semibold ${
                    pathname() === link.href
                      ? "bg-brand-purple text-white shadow-md"
                      : "text-slate-900 hover:bg-brand-purple hover:text-white dark:text-white"
                  }`}
                  href={sitePath(link.href)}
                  onClick={() => setMenuOpen(false)}>
                  {link.label}
                </a>
              )}
            </For>
          </nav>
        </Show>

        <Show when={navigating()}>
          <div class="mx-auto mt-1 h-0.5 max-w-5xl overflow-hidden rounded-full bg-brand-purple/20" role="status" aria-label="Loading page">
            <div class="h-full w-1/3 animate-pulse rounded-full bg-brand-purple" />
          </div>
        </Show>
      </header>

      <main class={`relative z-10 flex-1 ${isFullBleed() ? "" : "mx-auto w-full max-w-7xl px-4 pb-16 pt-8 sm:px-6"}`}>
        <Loading fallback={null}>{props.children}</Loading>
      </main>
    </div>
  );
}
