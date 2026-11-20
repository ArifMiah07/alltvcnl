import { Icon } from "./Icon";

export function SkeletonGrid() {
  return (
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3" aria-busy="true">
      {Array.from({ length: 6 }, () => (
        <div class="overflow-hidden rounded-sm border border-white/60 bg-white/35 backdrop-blur dark:border-white/10 dark:bg-slate-900/45">
          <div class="aspect-[16/10] animate-pulse bg-gradient-to-br from-sky-100 via-violet-100 to-fuchsia-100 dark:from-slate-800 dark:via-slate-900 dark:to-fuchsia-950/40" />
          <div class="space-y-2 border-t border-white/50 p-3 dark:border-white/10">
            <div class="h-4 w-3/4 animate-pulse rounded bg-slate-300/70 dark:bg-slate-700" />
            <div class="h-3 w-1/2 animate-pulse rounded bg-slate-300/60 dark:bg-slate-800" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function EmptyState(props: { title: string; message: string }) {
  return (
    <div class="glass-panel rounded-sm p-10 text-center">
      <p class="font-display text-xl font-bold text-slate-900 dark:text-white">{props.title}</p>
      <p class="mt-2 text-sm text-slate-700 dark:text-white/65">{props.message}</p>
    </div>
  );
}

export function ErrorState(props: { message: string; onRetry?: () => void }) {
  return (
    <div class="rounded-sm border border-rose-300/70 bg-rose-50/70 p-6 text-center shadow-sm backdrop-blur dark:border-rose-900 dark:bg-rose-950/45" role="alert">
      <div class="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-rose-100 text-rose-700 dark:bg-rose-900 dark:text-rose-200">
        <Icon name="alert" size={20} />
      </div>
      <p class="mt-3 font-display font-bold text-rose-900 dark:text-rose-100">Unable to load channels</p>
      <p class="mt-1 text-sm text-rose-700 dark:text-rose-300">{props.message}</p>
      {props.onRetry && (
        <button type="button" class="mt-4 rounded-sm bg-rose-600 px-4 py-2 text-sm font-bold text-white hover:bg-rose-500" onClick={props.onRetry}>
          Retry
        </button>
      )}
    </div>
  );
}
