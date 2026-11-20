import { For, createMemo, createSignal, onSettled } from "solid-js";
import { Icon } from "../../components/ui/Icon";
import { sitePath } from "../../lib/api/config";
import { heroSlides } from "../../data/heroSlides";

export function HeroSlider() {
  const [index, setIndex] = createSignal(0);
  const active = () => heroSlides[index()];
  const watchHref = () =>
    sitePath(`/watch?url=${encodeURIComponent(active().url)}&title=${encodeURIComponent(active().title)}`);

  const go = (next: number) => setIndex((next + heroSlides.length) % heroSlides.length);
  const visibleSlides = createMemo(() => {
    const total = heroSlides.length;
    const slides = [heroSlides[(index() + total - 1) % total], active(), heroSlides[(index() + 1) % total]];
    return slides.filter((slide, position) => slides.findIndex((item) => item.id === slide.id) === position);
  });

  onSettled(() => {
    let timer: number | undefined;
    const start = () => {
      if (timer !== undefined || document.hidden || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      timer = window.setInterval(() => setIndex((current) => (current + 1) % heroSlides.length), 6500);
    };
    const stop = () => {
      if (timer === undefined) return;
      window.clearInterval(timer);
      timer = undefined;
    };
    const onVisibility = () => (document.hidden ? stop() : start());

    document.addEventListener("visibilitychange", onVisibility);
    start();
    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  });

  return (
    <section class="relative min-h-[88vh] w-full overflow-hidden bg-slate-950 text-white" aria-label="Featured live channels">
      <For each={visibleSlides()}>
        {(slide) => (
          <div
            class={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${slide.id === active().id ? "opacity-100" : "opacity-0"}`}
            style={{ "background-image": `linear-gradient(to right, rgba(0,0,0,0.86), rgba(0,0,0,0.5) 55%, rgba(0,0,0,0.15)), url('${slide.imageUrl}')` }}
            aria-hidden="true"
          />
        )}
      </For>
      <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" aria-hidden="true" />

      <div class="relative z-10 mx-auto flex min-h-[88vh] max-w-7xl flex-col justify-center px-5 pb-24 pt-20 sm:px-8 lg:px-12">
        <div class="max-w-2xl animate-fadeUp">
          <span class="inline-flex rounded-full border border-emerald-300/40 bg-emerald-500/15 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-emerald-300">
            {active().category}
          </span>
          <h1 class="mt-5 font-display text-4xl font-bold leading-[1.05] text-balance text-white sm:text-5xl lg:text-6xl">
            {active().title}
          </h1>
          <p class="mt-5 max-w-xl text-base leading-7 text-white/75 sm:text-lg">{active().description}</p>
          <div class="mt-8 flex flex-wrap items-center gap-3">
            <a class="watch-now-btn" href={watchHref()}>
              <Icon name="play" size={17} />
              Watch Now
            </a>
            <a class="learn-more-btn" href={sitePath("/streams")}>
              Browse All Channels
            </a>
          </div>
        </div>

        <div class="absolute bottom-8 left-5 right-5 flex items-center justify-between sm:left-8 sm:right-8 lg:left-12 lg:right-12">
          <div class="flex items-center gap-2">
            <For each={heroSlides}>
              {(_, dotIndex) => (
                <button
                  type="button"
                  class={`h-2 rounded-full transition-all duration-300 ${dotIndex() === index() ? "w-8 bg-emerald-500" : "w-2 bg-white/40 hover:bg-white/70"}`}
                  aria-label={`Go to slide ${dotIndex() + 1}`}
                  onClick={() => setIndex(dotIndex())}
                />
              )}
            </For>
          </div>
          <div class="flex items-center gap-2">
            <span class="mr-2 text-xs font-semibold tracking-[0.2em] text-white/60">
              {String(index() + 1).padStart(2, "0")} / {String(heroSlides.length).padStart(2, "0")}
            </span>
            <button
              type="button"
              class="rounded-full border border-white/25 bg-black/25 p-2 text-white backdrop-blur transition hover:border-brand-purple hover:bg-brand-purple"
              aria-label="Previous slide"
              onClick={() => go(index() - 1)}>
              <Icon name="chevron-left" size={18} />
            </button>
            <button
              type="button"
              class="rounded-full border border-white/25 bg-black/25 p-2 text-white backdrop-blur transition hover:border-brand-purple hover:bg-brand-purple"
              aria-label="Next slide"
              onClick={() => go(index() + 1)}>
              <Icon name="chevron-right" size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
