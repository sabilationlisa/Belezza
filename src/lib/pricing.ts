import { AREA_UNIT_LABEL } from "../config/pricing";
import type { AreaPricing, FixedPricing, Pricing, Product, Variant } from "../types/product";

/** Pilihan pelanggan pada halaman detail. Nilai input disimpan sebagai string mentah. */
export interface Selection {
  variantId: string | null;
  widthCm: string;
  heightCm: string;
  quantity: string;
  notes: string;
  requirements: Record<string, string>;
}

export type FieldKey = "widthCm" | "heightCm" | "quantity";
export type FieldErrors = Partial<Record<FieldKey, string>>;

export type Estimate =
  | {
      status: "estimate";
      total: number;
      unitPrice: number;
      /** Luas (m²) atau panjang (m) untuk produk berbasis ukuran. */
      measure?: number;
    }
  | { status: "invalid"; errors: FieldErrors }
  | { status: "starting"; startingPrice: number }
  | { status: "inquiry" };

// ── Format ───────────────────────────────────────────────────────────

const idNumber = new Intl.NumberFormat("id-ID", { maximumFractionDigits: 0 });

/** 20000 → "Rp20.000" */
export function formatIDR(value: number): string {
  return `Rp${idNumber.format(value)}`;
}

/** 20000, "m²" → "Rp20.000/m²";  60000, undefined → "Rp60.000" */
export function formatUnitPrice(price: number, unit?: string): string {
  return unit ? `${formatIDR(price)}/${unit}` : formatIDR(price);
}

/** 1.5 → "1,5" (format angka Indonesia, maks. 2 desimal) */
export function formatDecimal(value: number): string {
  return new Intl.NumberFormat("id-ID", { maximumFractionDigits: 2 }).format(value);
}

export function getPriceUnit(pricing: Pricing): string | undefined {
  if (pricing.model === "area") return AREA_UNIT_LABEL[pricing.basis];
  if (pricing.model === "fixed") return pricing.unit;
  return undefined;
}

/** Label harga untuk kartu katalog, mis. "Mulai Rp20.000/m²" atau "Hubungi untuk harga". */
export function getCatalogPriceLabel(product: Product): string {
  const { pricing } = product;
  switch (pricing.model) {
    case "area":
    case "fixed": {
      const lowest = Math.min(...pricing.variants.map((v) => v.price));
      const label = formatUnitPrice(lowest, getPriceUnit(pricing));
      return pricing.variants.length > 1 ? `Mulai ${label}` : label;
    }
    case "starting":
      return `Mulai ${formatIDR(pricing.startingPrice)}`;
    case "inquiry":
      return "Hubungi untuk harga";
  }
}

// ── Validasi input ───────────────────────────────────────────────────

/** Menerima "200", "1,5", atau "1.5". Mengembalikan null bila tidak valid/≤ 0. */
export function parsePositiveNumber(raw: string): number | null {
  const s = raw.trim();
  if (!/^\d+([.,]\d+)?$/.test(s)) return null;
  const n = Number(s.replace(",", "."));
  return Number.isFinite(n) && n > 0 ? n : null;
}

/** Hanya bilangan bulat positif. */
export function parsePositiveInt(raw: string): number | null {
  const s = raw.trim();
  if (!/^\d+$/.test(s)) return null;
  const n = Number(s);
  return Number.isSafeInteger(n) && n > 0 ? n : null;
}

// ── Estimasi ─────────────────────────────────────────────────────────

export function getSelectedVariant(
  pricing: AreaPricing | FixedPricing,
  variantId: string | null,
): Variant {
  return pricing.variants.find((v) => v.id === variantId) ?? pricing.variants[0];
}

/**
 * Menghitung estimasi biaya cetak berbasis ukuran (Banner).
 * Tidak menerapkan biaya minimum, pembulatan ukuran, maupun biaya finishing.
 * Hasil dibulatkan ke Rupiah terdekat hanya untuk tampilan mata uang.
 */
export function calculateAreaEstimate(
  basis: AreaPricing["basis"],
  widthCm: number,
  heightCm: number,
  unitPrice: number,
  quantity: number,
): { measure: number; total: number } {
  const measure =
    basis === "m2"
      ? (widthCm / 100) * (heightCm / 100) // luas dalam m²
      : Math.max(widthCm, heightCm) / 100; // panjang dalam meter lari
  return { measure, total: Math.round(measure * unitPrice * quantity) };
}

export function calculateEstimate(product: Product, sel: Selection): Estimate {
  const { pricing } = product;

  if (pricing.model === "starting") {
    return { status: "starting", startingPrice: pricing.startingPrice };
  }
  if (pricing.model === "inquiry") {
    return { status: "inquiry" };
  }

  const errors: FieldErrors = {};
  const quantity = parsePositiveInt(sel.quantity);
  if (quantity === null) errors.quantity = "Masukkan jumlah berupa bilangan bulat lebih dari 0.";

  const variant = getSelectedVariant(pricing, sel.variantId);

  if (pricing.model === "area") {
    const width = parsePositiveNumber(sel.widthCm);
    const height = parsePositiveNumber(sel.heightCm);
    if (width === null) errors.widthCm = "Masukkan lebar dalam cm (angka lebih dari 0).";
    if (height === null) errors.heightCm = "Masukkan tinggi dalam cm (angka lebih dari 0).";
    if (width === null || height === null || quantity === null) return { status: "invalid", errors };

    const { measure, total } = calculateAreaEstimate(pricing.basis, width, height, variant.price, quantity);
    return { status: "estimate", total, unitPrice: variant.price, measure };
  }

  if (quantity === null) return { status: "invalid", errors };
  return { status: "estimate", total: variant.price * quantity, unitPrice: variant.price };
}

/** Pilihan awal saat produk dibuka — dipakai juga untuk me-reset pilihan saat ganti produk. */
export function createInitialSelection(product: Product): Selection {
  const { pricing } = product;
  const hasVariants = pricing.model === "area" || pricing.model === "fixed";
  return {
    variantId: hasVariants ? pricing.variants[0].id : null,
    widthCm: "",
    heightCm: "",
    quantity: "1",
    notes: "",
    requirements: Object.fromEntries((product.requirementFields ?? []).map((f) => [f.id, ""])),
  };
}
