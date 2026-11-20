import { For } from "solid-js";
import { Icon } from "../../components/ui/Icon";
import { sitePath } from "../../lib/api/config";
import { heroSrcSet, responsiveSrc } from "../../lib/images";

const features = [
  {
    tag: "LIVE",
    title: "Watch Live Streams",
    body: "Access sports, movies, news, and entertainment channels from around the world in one seamless player.",
    primary: "Browse channels",
    primaryHref: "/streams",
    secondary: "Learn more",
    secondaryHref: "/about",
    firstImage: "/hero/hero-img-bbc-earth",
    secondImage: "/hero/hero-img-Action-Hollywood-Movies",
    firstShadow: "shadow-purple",
    secondShadow: "shadow-pink",
  },
  {
    tag: "SEARCH",
    title: "Search and Save Channels",
    body: "Find a channel instantly, then keep it close with favorites and playlists that stay on your device.",
    primary: "Search now",
    primaryHref: "/search",
    secondary: "Open favorites",
    secondaryHref: "/favorites",
    firstImage: "/hero/hero-img-mr-bean",
    secondImage: "/hero/hero-img-heritage-plus",
    firstShadow: "shadow-pink",
    secondShadow: "shadow-purple",
  },
  {
    tag: "DESKTOP",
    title: "Get Our App",
    body: "Use the same fast player in your browser or install the desktop build for a focused, full-screen TV experience.",
    primary: "About the app",
    primaryHref: "/about",
    secondary: "Start watching",
    secondaryHref: "/streams",
    firstImage: "/hero/hero-img-the-explorers",
    secondImage: "/background/choose/whorl-61437-16x9",
    firstShadow: "shadow-purple",
    secondShadow: "shadow-pink",
  },
];

export function FeaturedSections() {
  return (
    <section class="mx-auto w-full max-w-7xl px-4 pt-8 sm:px-6">
      <div class="glass-bar mb-3 flex items-center justify-between rounded px-4 py-3">
        <p class="text-sm font-semibold text-slate-900/80 dark:text-white">Welcome to IPTV Player</p>
        <span class="hidden text-xs font-medium uppercase tracking-[0.18em] text-brand-purple dark:text-fuchsia-300 sm:inline">
          13,000+ channels
        </span>
      </div>

      <div class="flex flex-col gap-3">
        <For each={features}>
          {(feature, featureIndex) => (
            <article class="glass-panel group relative overflow-hidden rounded-sm p-5 sm:p-6 lg:min-h-[300px] lg:p-8">
              <div class="absolute right-4 top-3 font-display text-4xl font-bold text-brand-purple/10 dark:text-white/5">
                0{featureIndex() + 1}
              </div>
              <div class="relative grid h-full items-center gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
                <div class="relative h-56 w-full max-w-md sm:h-60 lg:h-[220px]">
                  <div class="absolute left-0 top-2 w-[76%] sm:w-[68%]">
                    <span class="absolute left-2 top-2 z-10 rounded bg-black/55 px-2 py-0.5 text-[10px] font-bold tracking-wider text-white backdrop-blur">
                      {feature.tag}
                    </span>
                    <img
                      src={responsiveSrc(feature.firstImage)}
                      srcset={heroSrcSet(feature.firstImage)}
                      sizes="(max-width: 640px) 76vw, (max-width: 1024px) 340px, 420px"
                      width={640}
                      height={360}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      class={`h-32 w-full rounded-sm object-cover sm:h-36 lg:h-40 ${feature.firstShadow}`}
                    />
                  </div>
                  <div class="absolute bottom-0 right-0 w-[70%] sm:w-[62%]">
                    <img
                      src={responsiveSrc(feature.secondImage)}
                      srcset={heroSrcSet(feature.secondImage)}
                      sizes="(max-width: 640px) 70vw, (max-width: 1024px) 300px, 380px"
                      width={640}
                      height={360}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      class={`ml-auto h-28 w-full rounded-sm object-cover sm:h-32 lg:h-36 ${feature.secondShadow}`}
                    />
                  </div>
                </div>

                <div class="relative">
                  <p class="text-xs font-bold uppercase tracking-[0.22em] text-brand-purple dark:text-fuchsia-300">{feature.tag} CHANNELS</p>
                  <h2 class="mt-2 font-display text-2xl font-bold text-slate-900/85 dark:text-white sm:text-3xl">{feature.title}</h2>
                  <p class="mt-3 max-w-md text-sm leading-6 text-slate-800/75 dark:text-white/70 sm:text-base">{feature.body}</p>
                  <div class="mt-5 flex flex-wrap items-center gap-3">
                    <a class="watch-now-btn px-4 py-2 text-sm" href={sitePath(feature.primaryHref)}>
                      {feature.primary}
                      <Icon name="chevron-right" size={15} />
                    </a>
                    <a class="learn-more-btn px-4 py-2 text-sm" href={sitePath(feature.secondaryHref)}>
                      {feature.secondary}
                    </a>
                  </div>
                </div>
              </div>
            </article>
          )}
        </For>
      </div>
    </section>
  );
}
