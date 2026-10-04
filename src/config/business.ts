/**
 * KONFIGURASI BISNIS — satu-satunya tempat untuk data kontak Belezza Printing.
 *
 * - whatsappNumber: format internasional, HANYA angka, tanpa "+" dan tanpa
 *   spasi (contoh: 6289656112061). Dipakai untuk tautan https://wa.me/<nomor>.
 *   Jika kosong/tidak valid, tombol WhatsApp otomatis dinonaktifkan dan pesan
 *   konfigurasi muncul di console (mode development).
 * - address, operatingHours, social: biarkan string kosong ("") bila belum ada.
 *   Kolom yang kosong TIDAK ditampilkan di website (tidak ada data fiktif).
 */
export interface BusinessConfig {
  name: string;
  tagline: string;
  shortDescription: string;
  whatsappNumber: string;
  address: string;
  operatingHours: string;
  social: {
    instagram: string;
    facebook: string;
    tiktok: string;
  };
}

export const businessConfig: BusinessConfig = {
  name: "Belezza Printing",
  tagline: "Cetak & Desain Grafis",
  shortDescription:
    "Belezza Printing melayani kebutuhan cetak dan desain grafis untuk usaha, acara, dan kebutuhan pribadi. Konsultasikan produk serta spesifikasi yang kamu perlukan melalui WhatsApp.",
  whatsappNumber: "6289656112061",
  // TODO(owner): isi alamat, jam operasional, dan URL media sosial bila ingin ditampilkan.
  address: "",
  operatingHours: "",
  social: {
    instagram: "",
    facebook: "",
    tiktok: "",
  },
};
