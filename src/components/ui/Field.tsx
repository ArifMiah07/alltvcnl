import type { JSX } from "@solidjs/web";

export function Input(props: JSX.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      class={`w-full rounded-sm border border-white/60 bg-white/50 px-3 py-2 text-sm font-medium text-slate-900 shadow-sm backdrop-blur placeholder:text-slate-500 focus:border-brand-purple focus:outline-none focus:ring-2 focus:ring-brand-purple/30 dark:border-white/10 dark:bg-slate-900/55 dark:text-white dark:placeholder:text-white/45 ${props.class ?? ""}`}
    />
  );
}

export function Select(props: JSX.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      class={`rounded-sm border border-white/60 bg-white/50 px-3 py-2 text-sm font-medium text-slate-900 shadow-sm backdrop-blur focus:border-brand-purple focus:outline-none focus:ring-2 focus:ring-brand-purple/30 dark:border-white/10 dark:bg-slate-900/55 dark:text-white ${props.class ?? ""}`}
    />
  );
}
