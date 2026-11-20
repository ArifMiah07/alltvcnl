import { Show } from "solid-js";
import type { JSX } from "@solidjs/web";

export function PageHeader(props: { title: string; description: string; action?: JSX.Element }) {
  return (
    <div class="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div class="border-l-4 border-brand-purple pl-4">
        <h1 class="font-display text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">{props.title}</h1>
        <p class="mt-1 max-w-2xl text-sm text-slate-700 dark:text-white/65">{props.description}</p>
      </div>
      <Show when={props.action}>{props.action}</Show>
    </div>
  );
}
