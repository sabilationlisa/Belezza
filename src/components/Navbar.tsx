import { useEffect, useState } from "react";
import { GENERAL_CONSULTATION_MESSAGE } from "../lib/whatsapp";
import { Logo } from "./Logo";
import { WhatsAppButton } from "./WhatsAppButton";
import { CloseIcon, MenuIcon } from "./ui/Icons";

export const NAV_LINKS = [
  { href: "#beranda", label: "Beranda" },
  { href: "#katalog", label: "Katalog" },
  { href: "#cara-pesan", label: "Cara Pesan" },
  { href: "#tentang", label: "Tentang" },
  { href: "#kontak", label: "Kontak" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/90 backdrop-blur">
      <nav aria-label="Navigasi utama" className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Logo />

        <ul className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="rounded-lg px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-slate-100 hover:text-ink">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <WhatsAppButton message={GENERAL_CONSULTATION_MESSAGE} size="sm" className="hidden sm:inline-flex" />
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-ink hover:bg-slate-100 md:hidden"
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? "Tutup menu" : "Buka menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </nav>

      <div id="menu-mobile" hidden={!open} className="border-t border-line bg-white md:hidden">
        <ul className="mx-auto max-w-6xl space-y-1 px-4 py-3">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-3 text-base font-medium text-ink hover:bg-slate-100"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li className="pt-2">
            <WhatsAppButton message={GENERAL_CONSULTATION_MESSAGE} className="w-full" />
          </li>
        </ul>
      </div>
    </header>
  );
}
