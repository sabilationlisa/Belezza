/**
 * Model data produk. Setiap produk memakai SATU model harga yang eksplisit:
 *
 * - "area"     : harga per satuan luas/panjang (Banner). Estimasi dihitung dari ukuran.
 * - "fixed"    : harga satuan × jumlah (Stiker, Kartu Nama, Poster, Mug, dll.).
 * - "starting" : harga mulai dari (Nota). Tidak menghitung total pasti.
 * - "inquiry"  : hubungi untuk harga (Roll Up Banner, Jasa Desain Grafis).
 */

export type CategoryId =
  | "banner-display"
  | "stiker-poster"
  | "kartu-administrasi"
  | "merchandise"
  | "jasa-desain";

export interface Category {
  id: CategoryId;
  name: string;
}

export interface Variant {
  id: string;
  name: string;
  /** Harga dalam Rupiah (angka bulat, tanpa format). */
  price: number;
}

/** Dasar perhitungan harga banner — lihat src/config/pricing.ts. */
export type AreaPricingBasis = "m2" | "linear-m";

export interface AreaPricing {
  model: "area";
  basis: AreaPricingBasis;
  variantLabel: string;
  variants: Variant[];
}

export interface FixedPricing {
  model: "fixed";
  /** Label pilihan varian, mis. "Bahan" atau "Tipe". */
  variantLabel?: string;
  variants: Variant[];
  /** Satuan harga yang ditampilkan, mis. "lembar" → "Rp10.000/lembar". Kosongkan bila tidak diketahui. */
  unit?: string;
  /** Label input jumlah, mis. "Jumlah lembar". */
  quantityLabel: string;
}

export interface StartingPricing {
  model: "starting";
  startingPrice: number;
}

export interface InquiryPricing {
  model: "inquiry";
}

export type Pricing = AreaPricing | FixedPricing | StartingPricing | InquiryPricing;

/** Kolom kebutuhan tambahan yang diisi pelanggan (untuk produk tanpa harga pasti). */
export interface RequirementField {
  id: string;
  label: string;
  placeholder: string;
  multiline?: boolean;
}

export type MockupKind =
  | "banner"
  | "xbanner"
  | "rollup"
  | "stiker"
  | "poster"
  | "kartu-nama"
  | "nota"
  | "undangan"
  | "ganci"
  | "mug"
  | "desain";

export interface Product {
  /** Slug unik, dipakai juga untuk tautan langsung: #produk/<id> */
  id: string;
  name: string;
  /** Kata kunci pencarian tambahan, mis. "ganci". */
  keywords?: string[];
  categoryId: CategoryId;
  shortDescription: string;
  description: string;
  pricing: Pricing;
  /** Catatan spesifikasi/konfirmasi yang ditampilkan di halaman detail. */
  specNotes: string[];
  requirementFields?: RequirementField[];
  /**
   * Foto produk asli (opsional), mis. "/images/banner.jpg" dari folder public/.
   * Bila kosong atau gagal dimuat, ditampilkan ilustrasi mockup.
   */
  image?: string;
  mockup: MockupKind;
}
