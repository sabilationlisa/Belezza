import { getProductById } from "../data/products";
import { getCatalogPriceLabel } from "../lib/pricing";
import { GENERAL_CONSULTATION_MESSAGE } from "../lib/whatsapp";
import type { MockupKind } from "../types/product";
import { ProductMockup } from "./ProductMockup";
import { WhatsAppButton } from "./WhatsAppButton";
import { buttonClass } from "./ui/button";
import { ArrowRightIcon, CheckIcon } from "./ui/Icons";

const highlights = ["Harga dasar mudah dilihat", "Konsultasi via WhatsApp", "Layanan desain grafis"];

const tiles: { kind: MockupKind; label: string }[] = [
  { kind: "kartu-nama", label: "Kartu Nama" },
  { kind: "mug", label: "Mug" },
  { kind: "stiker", label: "Stiker" },
];

export function Hero() {
  const banner = getProductById("banner");

  return (
    <section id="beranda" className="scroll-mt-16 overflow-hidden">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 pb-16 pt-12 sm:px-6 md:pt-16 lg:grid-cols-[1.05fr_1fr] lg:gap-14 lg:pb-24 lg:pt-20">
        <div>
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-line bg-white px-3 py-1 text-sm font-medium text-muted">
            <span className="h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
            Percetakan &amp; Desain Grafis
          </p>
          <h1 className="text-4xl font-bold leading-[1.08] text-ink sm:text-5xl lg:text-[3.4rem]">
            Cetak kebutuhan usahamu di <span className="text-primary">Belezza Printing</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
            Banner, stiker, kartu nama, undangan, merchandise, dan jasa desain grafis. Pilih produk, lihat harga, lalu
            konsultasikan kebutuhanmu melalui WhatsApp.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#katalog" className={buttonClass("primary", "lg")}>
              Lihat Katalog
              <ArrowRightIcon />
            </a>
            <WhatsAppButton message={GENERAL_CONSULTATION_MESSAGE} label="Konsultasi via WhatsApp" size="lg" />
          </div>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
            {highlights.map((h) => (
              <li key={h} className="flex items-center gap-2 text-sm font-medium text-ink">
                <CheckIcon className="text-primary" width={18} height={18} />
                {h}
              </li>
            ))}
          </ul>
        </div>

        {/* Komposisi mockup produk cetak */}
        <div className="relative" aria-label="Contoh produk cetak" role="group">
          <div className="grid grid-cols-3 gap-3 sm:gap-4">
            <figure className="col-span-3 overflow-hidden rounded-xl border border-line bg-white shadow-card">
              <ProductMockup kind="banner" className="aspect-[2/1] w-full" />
            </figure>
            {tiles.map((t) => (
              <figure key={t.kind} className="overflow-hidden rounded-xl border border-line bg-white shadow-card">
                <ProductMockup kind={t.kind} className="aspect-square w-full" />
                <figcaption className="border-t border-line px-3 py-2 text-xs font-semibold text-ink sm:text-sm">{t.label}</figcaption>
              </figure>
            ))}
          </div>
          {banner && (
            <div className="absolute -left-2 top-[38%] hidden rounded-xl border border-line bg-white px-4 py-3 shadow-lift sm:block lg:-left-6">
              <p className="text-xs font-medium text-muted">Banner</p>
              <p className="font-heading text-base font-bold text-ink">{getCatalogPriceLabel(banner)}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
