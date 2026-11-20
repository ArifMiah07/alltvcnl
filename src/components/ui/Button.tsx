import type { JSX } from "@solidjs/web";

type ButtonProps = JSX.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "danger";
};

const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary: "bg-brand-purple text-white shadow-md hover:bg-fuchsia-700 disabled:bg-fuchsia-950",
  secondary: "border border-white/60 bg-white/50 text-slate-900 shadow-sm backdrop-blur hover:bg-white/75 dark:border-white/10 dark:bg-slate-900/55 dark:text-white dark:hover:bg-slate-800",
  ghost: "bg-transparent text-slate-800 hover:bg-brand-purple/15 hover:text-brand-purple dark:text-white dark:hover:bg-white/10",
  danger: "bg-rose-600 text-white shadow-md hover:bg-rose-500",
};

export function Button(props: ButtonProps) {
  return (
    <button
      {...props}
      type={props.type ?? "button"}
      class={`inline-flex items-center justify-center gap-2 rounded-sm px-3 py-2 text-sm font-bold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple disabled:cursor-not-allowed disabled:opacity-60 ${variants[props.variant ?? "primary"]} ${props.class ?? ""}`}
    />
  );
}
