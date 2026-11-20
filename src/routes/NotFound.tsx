import { PageMeta } from "../components/ui/PageMeta";
import { sitePath } from "../lib/api/config";

export default function NotFound() {
  return (
    <>
      <PageMeta title="Page Not Found - AllTVCNL" description="The requested page could not be found." path="/404" noindex />
      <div class="glass-panel mx-auto max-w-lg rounded-sm px-6 py-16 text-center">
        <p class="font-display text-6xl font-bold text-brand-purple">404</p>
        <h1 class="mt-4 font-display text-2xl font-bold">Page not found</h1>
        <p class="mt-2 text-sm text-slate-700 dark:text-white/65">The page you requested does not exist.</p>
        <a class="watch-now-btn mt-6 px-5 py-2.5 text-sm" href={sitePath("/")}>
          Back to home
        </a>
      </div>
    </>
  );
}
