/** Kelas tombol bersama agar tampilan konsisten di seluruh komponen. */
export type ButtonVariant = "primary" | "secondary" | "whatsapp" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-primary text-white hover:bg-primary-hover shadow-sm",
  secondary: "bg-white text-ink border border-line hover:border-slate-300 hover:bg-slate-50",
  whatsapp: "bg-wa text-white hover:bg-wa-hover shadow-sm",
  ghost: "text-ink hover:bg-slate-100",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-base",
};

export function buttonClass(variant: ButtonVariant = "primary", size: ButtonSize = "md", extra = ""): string {
  return [
    "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-colors",
    "disabled:cursor-not-allowed disabled:opacity-60 aria-disabled:cursor-not-allowed aria-disabled:opacity-60",
    variants[variant],
    sizes[size],
    extra,
  ].join(" ");
}
