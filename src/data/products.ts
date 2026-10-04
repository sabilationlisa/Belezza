import { BANNER_PRICING_BASIS } from "../config/pricing";
import type { Category, Product } from "../types/product";

export const categories: Category[] = [
  { id: "banner-display", name: "Banner & Display" },
  { id: "stiker-poster", name: "Stiker & Poster" },
  { id: "kartu-administrasi", name: "Kartu & Administrasi" },
  { id: "merchandise", name: "Merchandise" },
  { id: "jasa-desain", name: "Jasa Desain" },
];

/**
 * Data produk. Harga disimpan sebagai angka Rupiah.
 * Detail yang belum diberikan pemilik (ukuran, isi paket, minimum order,
 * waktu pengerjaan, dll.) SENGAJA tidak diisi dan ditulis sebagai catatan konfirmasi.
 */
export const products: Product[] = [
  // ── Banner & Display ───────────────────────────────────────────────
  {
    id: "banner",
    name: "Banner",
    categoryId: "banner-display",
    shortDescription: "Banner cetak untuk promosi toko, acara, dan kegiatan.",
    description:
      "Banner cetak untuk promosi usaha, spanduk acara, dan kebutuhan informasi. Pilih bahan, masukkan ukuran, dan lihat estimasi biaya cetaknya.",
    pricing: {
      model: "area",
      // Lihat src/config/pricing.ts — asumsi m² masih perlu dikonfirmasi pemilik.
      basis: BANNER_PRICING_BASIS,
      variantLabel: "Bahan",
      variants: [
        { id: "flexy-china", name: "Flexy China", price: 20_000 },
        { id: "flexy-korea", name: "Flexy Korea", price: 50_000 },
        { id: "albatros", name: "Albatros", price: 100_000 },
      ],
    },
    specNotes: [
      "Estimasi dihitung dari luas cetak.",
      "Finishing (mata ayam, lipat, slongsong, dll.) dan harga akhir dikonfirmasi melalui WhatsApp.",
    ],
    mockup: "banner",
  },
  {
    id: "x-banner",
    name: "X Banner",
    categoryId: "banner-display",
    shortDescription: "Media display berdiri untuk toko, pameran, dan acara.",
    description:
      "X Banner untuk menampilkan promosi di depan toko, booth pameran, atau area acara. Tersedia tipe biasa dan aluminium.",
    pricing: {
      model: "fixed",
      variantLabel: "Tipe",
      variants: [
        { id: "biasa", name: "Biasa", price: 60_000 },
        { id: "aluminium", name: "Aluminium", price: 75_000 },
      ],
      quantityLabel: "Jumlah",
    },
    specNotes: ["Ukuran dan kelengkapan paket dikonfirmasi melalui WhatsApp."],
    mockup: "xbanner",
  },
  {
    id: "roll-up-banner",
    name: "Roll Up Banner",
    categoryId: "banner-display",
    shortDescription: "Display banner gulung yang praktis dibawa dan dipasang.",
    description:
      "Roll Up Banner untuk presentasi, pameran, dan acara. Ceritakan kebutuhanmu, lalu kami bantu berikan penawaran melalui WhatsApp.",
    pricing: { model: "inquiry" },
    specNotes: ["Ukuran, pilihan, dan harga dikonfirmasi melalui WhatsApp."],
    requirementFields: [
      { id: "ukuran", label: "Ukuran yang diinginkan", placeholder: "Contoh: sesuai rekomendasi" },
      { id: "jumlah", label: "Jumlah", placeholder: "Contoh: 2 unit" },
    ],
    mockup: "rollup",
  },

  // ── Stiker & Poster ────────────────────────────────────────────────
  {
    id: "stiker",
    name: "Stiker",
    categoryId: "stiker-poster",
    shortDescription: "Stiker label produk, kemasan, dan promosi.",
    description:
      "Cetak stiker untuk label produk, kemasan, segel, maupun promosi. Pilih bahan Cromo atau Vinyl sesuai kebutuhan.",
    pricing: {
      model: "fixed",
      variantLabel: "Bahan",
      variants: [
        { id: "cromo", name: "Cromo", price: 10_000 },
        { id: "vinyl", name: "Vinyl", price: 20_000 },
      ],
      unit: "lembar",
      quantityLabel: "Jumlah lembar",
    },
    specNotes: ["Ukuran lembar dan ketentuan potong dikonfirmasi melalui WhatsApp."],
    mockup: "stiker",
  },
  {
    id: "poster",
    name: "Poster",
    categoryId: "stiker-poster",
    shortDescription: "Poster untuk promosi, pengumuman, dan dekorasi.",
    description: "Cetak poster untuk promosi produk, informasi acara, maupun dekorasi ruangan.",
    pricing: {
      model: "fixed",
      variants: [{ id: "standar", name: "Poster", price: 8_000 }],
      unit: "lembar",
      quantityLabel: "Jumlah lembar",
    },
    specNotes: ["Ukuran dan jenis kertas dikonfirmasi melalui WhatsApp."],
    mockup: "poster",
  },

  // ── Kartu & Administrasi ───────────────────────────────────────────
  {
    id: "kartu-nama",
    name: "Kartu Nama",
    categoryId: "kartu-administrasi",
    shortDescription: "Kartu nama untuk identitas usaha dan profesional.",
    description:
      "Kartu nama untuk memperkenalkan usaha atau profesimu. Dijual per kotak; detail isi dan bahan dikonfirmasi bersama.",
    pricing: {
      model: "fixed",
      variants: [{ id: "standar", name: "Kartu Nama", price: 30_000 }],
      unit: "kotak",
      quantityLabel: "Jumlah kotak",
    },
    specNotes: [
      "Jumlah kartu per kotak, jenis kertas, dan cetak satu/dua sisi dikonfirmasi melalui WhatsApp.",
    ],
    mockup: "kartu-nama",
  },
  {
    id: "nota",
    name: "Nota",
    categoryId: "kartu-administrasi",
    shortDescription: "Nota usaha dengan identitas tokomu sendiri.",
    description:
      "Cetak nota untuk transaksi usaha dengan nama dan identitas tokomu. Harga mengikuti spesifikasi yang dikonfirmasi melalui WhatsApp.",
    pricing: { model: "starting", startingPrice: 120_000 },
    specNotes: [
      "Harga mulai Rp120.000; harga akhir mengikuti spesifikasi.",
      "Jumlah buku, rangkap, dan lembar dikonfirmasi melalui WhatsApp.",
    ],
    requirementFields: [
      { id: "jumlah", label: "Jumlah yang dibutuhkan", placeholder: "Contoh: 5 buku" },
      { id: "spesifikasi", label: "Ukuran & rangkap", placeholder: "Contoh: 2 rangkap, ukuran kecil" },
    ],
    mockup: "nota",
  },
  {
    id: "undangan",
    name: "Undangan",
    categoryId: "kartu-administrasi",
    shortDescription: "Undangan pernikahan, syukuran, dan acara lainnya.",
    description:
      "Cetak undangan untuk pernikahan, khitanan, ulang tahun, dan berbagai acara. Model dan bahan dapat dikonsultasikan.",
    pricing: {
      model: "fixed",
      variants: [{ id: "standar", name: "Undangan", price: 1_250 }],
      unit: "pcs",
      quantityLabel: "Jumlah pcs",
    },
    specNotes: ["Bahan, model, dan minimum order (jika ada) dikonfirmasi melalui WhatsApp."],
    mockup: "undangan",
  },

  // ── Merchandise ────────────────────────────────────────────────────
  {
    id: "gantungan-kunci",
    name: "Gantungan Kunci",
    keywords: ["ganci", "gantungan kunci"],
    categoryId: "merchandise",
    shortDescription: "Ganci custom untuk suvenir, merchandise, dan hadiah.",
    description:
      "Gantungan kunci (ganci) custom dengan desainmu sendiri — cocok untuk suvenir acara, merchandise komunitas, atau hadiah.",
    pricing: {
      model: "fixed",
      variants: [{ id: "standar", name: "Gantungan Kunci", price: 6_000 }],
      unit: "pcs",
      quantityLabel: "Jumlah pcs",
    },
    specNotes: ["Bahan dan detail kustomisasi dikonfirmasi melalui WhatsApp."],
    mockup: "ganci",
  },
  {
    id: "mug",
    name: "Mug",
    categoryId: "merchandise",
    shortDescription: "Mug custom untuk suvenir, hadiah, dan promosi.",
    description: "Mug dengan cetakan desain custom untuk suvenir, hadiah, maupun merchandise usaha.",
    pricing: {
      model: "fixed",
      variants: [{ id: "standar", name: "Mug", price: 25_000 }],
      unit: "pcs",
      quantityLabel: "Jumlah pcs",
    },
    specNotes: ["Spesifikasi cetak dikonfirmasi melalui WhatsApp."],
    mockup: "mug",
  },

  // ── Jasa Desain ────────────────────────────────────────────────────
  {
    id: "jasa-desain-grafis",
    name: "Jasa Desain Grafis",
    categoryId: "jasa-desain",
    shortDescription: "Desain untuk kebutuhan cetak dan promosi usahamu.",
    description:
      "Layanan desain grafis untuk kebutuhan cetak dan promosi — misalnya banner, stiker label, kartu nama, undangan, atau materi promosi lainnya. Ceritakan desain yang kamu butuhkan.",
    pricing: { model: "inquiry" },
    specNotes: [
      "Harga desain dikonfirmasi melalui WhatsApp sesuai kebutuhan.",
      "Biaya desain terpisah dari harga cetak, kecuali dikonfirmasi lain.",
    ],
    requirementFields: [
      { id: "jenis", label: "Jenis desain", placeholder: "Contoh: desain banner toko, label kemasan" },
      {
        id: "deskripsi",
        label: "Deskripsi kebutuhan desain",
        placeholder: "Ceritakan isi, gaya, warna, atau referensi yang kamu inginkan",
        multiline: true,
      },
    ],
    mockup: "desain",
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getCategoryName(id: string): string {
  return categories.find((c) => c.id === id)?.name ?? "";
}
