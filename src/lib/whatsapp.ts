import { businessConfig } from "../config/business";
import type { Product } from "../types/product";
import {
  formatDecimal,
  formatIDR,
  formatUnitPrice,
  getPriceUnit,
  getSelectedVariant,
  parsePositiveInt,
  parsePositiveNumber,
  type Estimate,
  type Selection,
} from "./pricing";

/**
 * Nomor valid untuk wa.me: hanya angka, format internasional (tanpa "+"),
 * tidak diawali 0, panjang 8–15 digit (standar E.164).
 */
export function isValidWhatsappNumber(value: string | undefined | null): value is string {
  return typeof value === "string" && /^[1-9]\d{7,14}$/.test(value);
}

export function getWhatsappNumber(): string | null {
  const n = businessConfig.whatsappNumber;
  if (isValidWhatsappNumber(n)) return n;
  if (import.meta.env?.DEV) {
    console.warn(
      "[Belezza Printing] whatsappNumber di src/config/business.ts kosong atau tidak valid. " +
        "Gunakan format internasional tanpa '+', mis. 6281234567890. Tombol WhatsApp dinonaktifkan.",
    );
  }
  return null;
}

export function buildWhatsappUrl(number: string, message: string): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

const GREETING = `Halo ${businessConfig.name}, saya ingin bertanya/pesan:`;
const CLOSING =
  "Mohon konfirmasi harga akhir, spesifikasi, dan estimasi waktu pengerjaannya. Terima kasih.";

export const GENERAL_CONSULTATION_MESSAGE = `Halo ${businessConfig.name}, saya ingin berkonsultasi mengenai kebutuhan cetak/desain. Mohon informasinya. Terima kasih.`;

/** Menyusun pesan WhatsApp hanya dengan kolom yang relevan untuk produk terpilih. */
export function buildProductMessage(product: Product, sel: Selection, estimate: Estimate): string {
  const { pricing } = product;
  const lines: string[] = [`Produk: ${product.name}`];

  if (pricing.model === "area" || pricing.model === "fixed") {
    const variant = getSelectedVariant(pricing, sel.variantId);
    const unit = getPriceUnit(pricing);
    if (pricing.variants.length > 1) {
      lines.push(`${pricing.variantLabel ?? "Varian"}: ${variant.name}`);
    }

    if (pricing.model === "area") {
      const w = parsePositiveNumber(sel.widthCm);
      const h = parsePositiveNumber(sel.heightCm);
      if (w !== null && h !== null) {
        lines.push(`Ukuran: ${formatDecimal(w)} × ${formatDecimal(h)} cm`);
      }
    }

    const qty = parsePositiveInt(sel.quantity);
    if (qty !== null) {
      lines.push(`Jumlah: ${qty}${pricing.model === "fixed" && pricing.unit ? ` ${pricing.unit}` : ""}`);
    }

    lines.push(`Harga dasar: ${formatUnitPrice(variant.price, unit)}`);

    if (estimate.status === "estimate") {
      const label = pricing.model === "area" ? "Estimasi biaya cetak" : "Estimasi total";
      lines.push(`${label}: ${formatIDR(estimate.total)}`);
    }
  }

  for (const field of product.requirementFields ?? []) {
    const value = sel.requirements[field.id]?.trim();
    if (value) lines.push(`${field.label}: ${value}`);
  }

  if (pricing.model === "starting") {
    lines.push(`Harga awal: Mulai ${formatIDR(pricing.startingPrice)}; harga akhir perlu dikonfirmasi`);
  }
  if (pricing.model === "inquiry") {
    lines.push("Harga: Mohon penawaran");
  }

  const notes = sel.notes.trim();
  if (notes) lines.push(`Catatan: ${notes}`);

  return [GREETING, "", ...lines, "", CLOSING].join("\n");
}

