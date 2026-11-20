import { Show } from "solid-js";
import { PageMeta } from "../components/ui/PageMeta";
import { SkeletonGrid } from "../components/ui/State";
import { ChannelGrid } from "../features/channels/ChannelGrid";
import { FeaturedSections } from "../features/home/FeaturedSections";
import { HeroSlider } from "../features/home/HeroSlider";
import { sitePath } from "../lib/api/config";
import { SITE_DESCRIPTION, SITE_TITLE, homeSchema } from "../lib/seo";
import { createResource } from "../lib/resource";
import { getFeaturedChannels } from "../lib/api/client";
import { Icon } from "../components/ui/Icon";

export default function Home() {
  const state = createResource((signal) => getFeaturedChannels(signal), () => "home");

  return (
    <>
      <PageMeta
        title={SITE_TITLE}
        description={SITE_DESCRIPTION}
        path="/home"
        schema={homeSchema()}
      />

      <HeroSlider />
      <FeaturedSections />

      <section class="mx-auto w-full max-w-7xl px-4 pb-4 pt-12 sm:px-6">
        <div class="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p class="text-xs font-bold uppercase tracking-[0.22em] text-brand-purple dark:text-fuchsia-300">On demand now</p>
            <h2 class="mt-1 font-display text-3xl font-bold text-slate-900 dark:text-white">Featured channels</h2>
            <p class="mt-1 max-w-2xl text-sm text-slate-700 dark:text-white/65">A quick sample from the collected channel catalog.</p>
          </div>
          <a class="learn-more-btn w-fit px-4 py-2 text-sm" href={sitePath("/streams")}>
            View all channels
            <Icon name="chevron-right" size={15} />
          </a>
        </div>

        <Show when={!state().loading && !state().error} fallback={<SkeletonGrid />}>
          <ChannelGrid channels={state().data ?? []} />
        </Show>
      </section>
    </>
  );
}
