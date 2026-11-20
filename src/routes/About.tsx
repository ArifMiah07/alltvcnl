import { PageMeta } from "../components/ui/PageMeta";
import { PageHeader } from "../features/channels/PageHeader";

export default function About() {
  return (
    <>
      <PageMeta title="About - AllTVCNL" description="Learn how AllTVCNL keeps IPTV browsing fast, private, and accessible." path="/about" />
      <PageHeader title="About AllTVCNL" description="A focused IPTV player built with Solid 2." />
      <div class="glass-panel max-w-none space-y-4 rounded-sm p-6 text-sm leading-7 text-slate-800 dark:text-white/75 sm:p-8">
        <p>
          IPTV Player is a web and desktop player for public IPTV streams. It uses Solid 2 fine-grained reactivity, a single active HLS player,
          and local storage for favorites and playlists.
        </p>
        <p>
          Channel data comes from public sources and the configured IPTV API. Stream availability depends on the source. No analytics are
          collected, and your saved channels never leave your device.
        </p>
        <div class="grid gap-3 pt-2 sm:grid-cols-3">
          <div class="rounded-sm border border-white/60 bg-white/35 p-4 dark:border-white/10 dark:bg-slate-950/35">
            <p class="font-display text-2xl font-bold text-brand-purple dark:text-fuchsia-300">13K+</p>
            <p class="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-white/60">Public channels</p>
          </div>
          <div class="rounded-sm border border-white/60 bg-white/35 p-4 dark:border-white/10 dark:bg-slate-950/35">
            <p class="font-display text-2xl font-bold text-brand-purple dark:text-fuchsia-300">HLS</p>
            <p class="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-white/60">Adaptive playback</p>
          </div>
          <div class="rounded-sm border border-white/60 bg-white/35 p-4 dark:border-white/10 dark:bg-slate-950/35">
            <p class="font-display text-2xl font-bold text-brand-purple dark:text-fuchsia-300">Local</p>
            <p class="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-white/60">Private favorites</p>
          </div>
        </div>
      </div>
    </>
  );
}
