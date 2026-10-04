import { useMemo, useState } from "react";
import { categories, products } from "../../data/products";
import { GENERAL_CONSULTATION_MESSAGE } from "../../lib/whatsapp";
import type { CategoryId, Product } from "../../types/product";
import { SectionHeading } from "../SectionHeading";
import { WhatsAppButton } from "../WhatsAppButton";
import { buttonClass } from "../ui/button";
import { CloseIcon, SearchIcon } from "../ui/Icons";
import { ProductCard } from "./ProductCard";

type Filter = CategoryId | "semua";

const normalize = (s: string) => s.toLocaleLowerCase("id-ID").trim();

function matches(product: Product, query: string): boolean {
  if (!query) return true;
  return [product.name, ...(product.keywords ?? [])].some((t) => normalize(t).includes(query));
}

export function Catalog({ onOpenProduct }: { onOpenProduct: (id: string) => void }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("semua");

  const q = normalize(query);
  const visible = useMemo(
    () => products.filter((p) => (filter === "semua" || p.categoryId === filter) && matches(p, q)),
    [filter, q],
  );

  const filters: { id: Filter; name: string }[] = [{ id: "semua", name: "Semua Produk" }, ...categories];
  const resetAll = () => {
    setQuery("");
    setFilter("semua");
  };

  return (
    <section id="katalog" aria-labelledby="katalog-judul" className="scroll-mt-16 border-y border-line bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="katalog-judul"
            eyebrow="Katalog"
            title="Produk cetak & layanan desain"
            description="Lihat harga dasar setiap produk, lalu buka detail untuk memilih bahan, jumlah, dan menghitung estimasi."
          />
          <div className="relative w-full lg:max-w-xs">
            <label htmlFor="cari-produk" className="sr-only">
              Cari produk
            </label>
            <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
            <input
              id="cari-produk"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari produk, mis. stiker"
              autoComplete="off"
              className="h-12 w-full rounded-xl border border-line bg-canvas pl-11 pr-10 text-base text-ink placeholder:text-slate-400 focus:border-primary focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Hapus pencarian"
                className="absolute right-2 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-lg text-muted hover:bg-slate-100"
              >
                <CloseIcon width={16} height={16} />
              </button>
            )}
          </div>
        </div>

        <div role="group" aria-label="Filter kategori" className="-mx-4 mt-8 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:px-0">
          {filters.map((f) => {
            const active = filter === f.id;
            return (
              <button
                key={f.id}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(f.id)}
                className={`h-10 shrink-0 whitespace-nowrap rounded-full border px-4 text-sm font-medium transition-colors ${
                  active
                    ? "border-primary bg-primary text-white"
                    : "border-line bg-white text-ink hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                {f.name}
              </button>
            );
          })}
        </div>

        <p className="mt-6 text-sm text-muted" aria-live="polite">
          Menampilkan {visible.length} produk
        </p>

        {visible.length > 0 ? (
          <ul className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((p) => (
              <li key={p.id} className="flex">
                <ProductCard product={p} onOpen={onOpenProduct} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-4 rounded-xl border border-dashed border-slate-300 bg-canvas px-6 py-14 text-center">
            <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-white text-muted shadow-card">
              <SearchIcon />
            </div>
            <h3 className="mt-4 text-xl font-semibold text-ink">Produk tidak ditemukan</h3>
            <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted">
              {query ? (
                <>
                  Tidak ada produk yang cocok dengan “{query.trim()}”
                  {filter !== "semua" && " pada kategori ini"}. Coba kata kunci lain, atau tanyakan langsung kebutuhanmu
                  melalui WhatsApp.
                </>
              ) : (
                "Belum ada produk pada kategori ini."
              )}
            </p>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <button type="button" onClick={resetAll} className={buttonClass("secondary", "md")}>
                Tampilkan semua produk
              </button>
              <WhatsAppButton message={GENERAL_CONSULTATION_MESSAGE} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
