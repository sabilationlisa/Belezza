import type { AreaPricingBasis } from "../types/product";

/**
 * ⚠️ ASUMSI SEMENTARA — WAJIB DIKONFIRMASI PEMILIK SEBELUM RILIS ⚠️
 *
 * Pemilik awalnya memberikan harga banner sebagai "per meter". Implementasi ini
 * SEMENTARA mengasumsikan harga per METER PERSEGI (m²):
 *
 *   luas (m²) = (lebarCm / 100) × (tinggiCm / 100)
 *   estimasi  = luas × hargaBahan × jumlah
 *
 * Jika ternyata harga dihitung per METER LARI (panjang), ubah nilai di bawah
 * menjadi "linear-m". Pada mode itu estimasi = (panjangCm / 100) × harga × jumlah,
 * dengan "panjang" = sisi terpanjang cetakan, dan label satuan berubah menjadi "/m".
 */
export const BANNER_PRICING_BASIS: AreaPricingBasis = "m2";

/** Label satuan untuk tiap dasar perhitungan. */
export const AREA_UNIT_LABEL: Record<AreaPricingBasis, string> = {
  m2: "m²",
  "linear-m": "m",
};
