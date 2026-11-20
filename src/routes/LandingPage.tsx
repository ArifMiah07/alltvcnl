import { For } from "solid-js";
import { sitePath } from "../lib/api/config";
import { OG_DESCRIPTION, OG_TITLE, SITE_DESCRIPTION, SITE_TITLE } from "../lib/seo";
import { Footer } from "../components/layout/Footer";
import { PageMeta } from "../components/ui/PageMeta";

const features = [
  { title: "13,000+ Channels", description: "Wide variety of live TV channels from across the globe." },
  { title: "Bookmark Favorites", description: "Save your preferred channels for quick access anytime." },
  { title: "Responsive & Fast", description: "Works smoothly on desktop, mobile, and tablets." },
];

export default function LandingPage() {
  return (
    <>
      <PageMeta
        title={SITE_TITLE}
        description={SITE_DESCRIPTION}
        ogTitle={OG_TITLE}
        ogDescription={OG_DESCRIPTION}
        path="/"
      />
      <div class="flex min-h-screen flex-col bg-gradient-to-b from-blue-900 to-indigo-700 text-white dark:bg-black dark:bg-none">
      <main class="flex flex-1 flex-col items-center justify-center px-6 py-16 md:px-20">
        <section class="max-w-5xl space-y-8 text-center">
          <h1 class="font-display text-4xl font-extrabold leading-tight drop-shadow-lg sm:text-5xl">
            IPTV Player — Stream 13,000+ Live Channels Instantly
          </h1>
          <p class="mx-auto max-w-3xl text-lg leading-relaxed opacity-90 sm:text-xl">
            Experience fast, reliable, and responsive IPTV streaming with powerful search, bookmarks, and seamless playback on any device.
          </p>
          <div class="mt-8 flex flex-wrap justify-center gap-6">
            <a
              class="rounded-lg bg-indigo-500 px-8 py-4 font-semibold shadow-lg transition hover:bg-indigo-600"
              href={sitePath("/stream-iptv")}>
              Launch IPTV Player
            </a>
            <a
              class="rounded-lg border border-white px-8 py-4 font-semibold transition hover:bg-white hover:text-indigo-700"
              href={sitePath("/about")}>
              Learn More
            </a>
          </div>
        </section>

        <section class="mt-20 grid w-full max-w-6xl grid-cols-1 gap-10 text-center md:grid-cols-3">
          <For each={features}>
            {(feature) => (
              <div class="cursor-default rounded-lg bg-indigo-800/50 p-6 shadow-lg transition-shadow hover:shadow-xl">
                <h3 class="mb-2 font-display text-2xl font-bold">{feature.title}</h3>
                <p class="leading-relaxed">{feature.description}</p>
              </div>
            )}
          </For>
        </section>
      </main>
      <Footer />
      </div>
    </>
  );
}
