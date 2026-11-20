import { sitePath } from "../../lib/api/config";

export function Footer() {
  return (
    <footer class="relative z-10 mt-16 bg-brand-ink text-white">
      <div class="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-5 py-10 sm:grid-cols-2 lg:grid-cols-4 lg:px-6">
        <div>
          <h2 class="font-display text-2xl font-bold">IPTV Player</h2>
          <p class="mt-2 text-sm text-white/75">Thousands of live channels in one fast, private, lightweight player.</p>
        </div>
        <div>
          <h3 class="font-display text-lg font-semibold">Explore</h3>
          <ul class="mt-2 space-y-1 text-sm text-white/80">
            <li><a class="hover:text-white hover:underline" href={sitePath("/streams")}>All channels</a></li>
            <li><a class="hover:text-white hover:underline" href={sitePath("/verified")}>Verified streams</a></li>
            <li><a class="hover:text-white hover:underline" href={sitePath("/search")}>Search</a></li>
            <li><a class="hover:text-white hover:underline" href={sitePath("/collected")}>Collected channels</a></li>
          </ul>
        </div>
        <div>
          <h3 class="font-display text-lg font-semibold">Library</h3>
          <ul class="mt-2 space-y-1 text-sm text-white/80">
            <li><a class="hover:text-white hover:underline" href={sitePath("/favorites")}>Favorites</a></li>
            <li><a class="hover:text-white hover:underline" href={sitePath("/playlists")}>Playlists</a></li>
            <li><a class="hover:text-white hover:underline" href={sitePath("/playlist-player")}>Playlist player</a></li>
            <li><a class="hover:text-white hover:underline" href={sitePath("/about")}>About</a></li>
          </ul>
        </div>
        <div>
          <h3 class="font-display text-lg font-semibold">Built for every screen</h3>
          <p class="mt-2 text-sm text-white/75">Run it in the browser or install the desktop app. Favorites and playlists stay on your device.</p>
          <a class="mt-3 inline-flex rounded bg-white px-4 py-2 text-sm font-semibold text-brand-ink transition hover:bg-brand-purple hover:text-white" href={sitePath("/about")}>
            Learn more
          </a>
        </div>
      </div>
      <div class="border-t border-white/10 px-5 py-5 text-center text-xs text-white/65">
        &copy; {new Date().getFullYear()} IPTV Player. Public IPTV sources. No analytics.
      </div>
    </footer>
  );
}
