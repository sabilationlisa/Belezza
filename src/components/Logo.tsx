import { businessConfig } from "../config/business";

export function Logo({ inverted = false }: { inverted?: boolean }) {
  return (
    <a href="#beranda" className="flex items-center gap-2.5" aria-label={`${businessConfig.name} — ke beranda`}>
      <span aria-hidden="true" className="grid h-9 w-9 place-items-center rounded-lg bg-primary font-heading text-lg font-bold text-white">
        B
      </span>
      <span className={`font-heading text-lg font-bold tracking-tight ${inverted ? "text-white" : "text-ink"}`}>
        Belezza <span className={inverted ? "text-blue-300" : "text-primary"}>Printing</span>
      </span>
    </a>
  );
}
