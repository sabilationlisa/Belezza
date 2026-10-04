# Belezza Printing — Katalog Website

Katalog produk cetak & jasa desain grafis untuk **Belezza Printing**.
React + TypeScript + Tailwind CSS v4 (Vite). Pemesanan diteruskan lewat WhatsApp: tidak ada checkout, pembayaran online, maupun akun.

## Menjalankan

```bash
npm install
npm run dev      # development
npm run build    # build produksi ke dist/
npm test         # unit test logika harga & pesan WhatsApp (vitest)
```

## ⚠️ Wajib dicek sebelum rilis

1. **Dasar harga Banner (m² atau meter lari).**
   Pemilik awalnya menulis harga banner "per meter". Situs ini **sementara** menghitungnya per **m²**:
   `luas = (lebar/100) × (tinggi/100)`, `estimasi = luas × harga × jumlah`.
   Konfirmasi ke pemilik. Kalau ternyata per meter lari, ubah `BANNER_PRICING_BASIS` menjadi `"linear-m"` di
   `src/config/pricing.ts`.
2. **Nomor WhatsApp.** Atur di `src/config/business.ts` → `whatsappNumber`
   (format internasional, hanya angka, tanpa `+`; contoh `6289656112061`). Kalau kosong atau tidak valid, semua
   tombol WhatsApp otomatis dinonaktifkan ("WhatsApp belum tersedia") dan muncul peringatan di console saat development.
3. **Alamat, jam operasional, media sosial.** Isi di `src/config/business.ts`. Kolom yang kosong tidak ditampilkan.
4. **Foto produk.** Saat ini setiap produk menampilkan ilustrasi mockup SVG berlabel "Ilustrasi produk".
   Untuk memakai foto asli, simpan file di `public/images/` lalu isi `image: "/images/banner.jpg"` pada produk
   terkait di `src/data/products.ts`. Rasio yang disarankan 4:3; gambar ditampilkan `object-cover` sehingga tidak
   pernah melar. Kalau foto gagal dimuat, ilustrasi tampil kembali secara otomatis.

## Struktur

```
src/
  config/business.ts     ← kontak & nomor WhatsApp (satu tempat)
  config/pricing.ts      ← asumsi dasar harga banner (m² / meter lari)
  data/products.ts       ← kategori & 11 produk beserta harga (angka Rupiah)
  types/product.ts       ← model harga: area | fixed | starting | inquiry
  lib/pricing.ts         ← format Rupiah, validasi input, kalkulasi estimasi
  lib/whatsapp.ts        ← validasi nomor, penyusun pesan, tautan wa.me
  hooks/useProductRoute  ← tautan langsung ke produk: #produk/<id>
  components/            ← UI (Navbar, Hero, Catalog, ProductDialog, dll.)
```

### Model harga

| Model      | Produk                                              | Perilaku                                                   |
|------------|-----------------------------------------------------|------------------------------------------------------------|
| `area`     | Banner                                              | Bahan + lebar/tinggi (cm) + jumlah → estimasi biaya cetak  |
| `fixed`    | Stiker, Poster, Kartu Nama, X Banner, Ganci, Mug, Undangan | Harga satuan × jumlah → estimasi total               |
| `starting` | Nota                                                | "Mulai Rp120.000", tanpa total; mengumpulkan spesifikasi   |
| `inquiry`  | Roll Up Banner, Jasa Desain Grafis                  | "Hubungi untuk harga"; mengumpulkan kebutuhan              |

Tidak ada biaya minimum, pembulatan ukuran, biaya finishing, diskon, atau waktu pengerjaan yang diterapkan atau
ditampilkan. Semua itu dikonfirmasi melalui WhatsApp.

### Tautan langsung ke produk

Setiap produk punya tautan sendiri, misalnya `https://domain-anda/#produk/banner` atau `#produk/kartu-nama`.
