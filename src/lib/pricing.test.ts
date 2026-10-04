import { describe, expect, it } from "vitest";
import { getProductById, products } from "../data/products";
import type { Product } from "../types/product";
import {
  calculateEstimate,
  createInitialSelection,
  formatIDR,
  getCatalogPriceLabel,
  parsePositiveInt,
  parsePositiveNumber,
} from "./pricing";
import { buildProductMessage, buildWhatsappUrl, isValidWhatsappNumber } from "./whatsapp";

const get = (id: string): Product => {
  const p = getProductById(id);
  if (!p) throw new Error(`produk ${id} tidak ada`);
  return p;
};

describe("format", () => {
  it("memformat Rupiah gaya Indonesia", () => {
    expect(formatIDR(20000)).toBe("Rp20.000");
    expect(formatIDR(1250)).toBe("Rp1.250");
    expect(formatIDR(120000)).toBe("Rp120.000");
  });

  it("label harga katalog", () => {
    expect(getCatalogPriceLabel(get("banner"))).toBe("Mulai Rp20.000/m²");
    expect(getCatalogPriceLabel(get("stiker"))).toBe("Mulai Rp10.000/lembar");
    expect(getCatalogPriceLabel(get("kartu-nama"))).toBe("Rp30.000/kotak");
    expect(getCatalogPriceLabel(get("x-banner"))).toBe("Mulai Rp60.000");
    expect(getCatalogPriceLabel(get("nota"))).toBe("Mulai Rp120.000");
    expect(getCatalogPriceLabel(get("roll-up-banner"))).toBe("Hubungi untuk harga");
    expect(getCatalogPriceLabel(get("jasa-desain-grafis"))).toBe("Hubungi untuk harga");
  });

  it("memuat 11 produk dengan id unik", () => {
    expect(products.length).toBe(11);
    expect(new Set(products.map((p) => p.id)).size).toBe(11);
  });
});

describe("validasi", () => {
  it("angka positif", () => {
    expect(parsePositiveNumber("200")).toBe(200);
    expect(parsePositiveNumber("1,5")).toBe(1.5);
    expect(parsePositiveNumber("0")).toBe(null);
    expect(parsePositiveNumber("-3")).toBe(null);
    expect(parsePositiveNumber("abc")).toBe(null);
    expect(parsePositiveNumber("")).toBe(null);
    expect(parsePositiveNumber("1e400")).toBe(null);
  });
  it("bilangan bulat positif", () => {
    expect(parsePositiveInt("3")).toBe(3);
    expect(parsePositiveInt("1.5")).toBe(null);
    expect(parsePositiveInt("0")).toBe(null);
  });
});

describe("estimasi", () => {
  it("banner Flexy China 200×100 cm × 1 = Rp40.000", () => {
    const banner = get("banner");
    const sel = { ...createInitialSelection(banner), widthCm: "200", heightCm: "100", quantity: "1" };
    const est = calculateEstimate(banner, sel);
    expect(est.status).toBe("estimate");
    if (est.status === "estimate") expect(est.total).toBe(40000);
  });

  it("banner Albatros 300×150 × 2", () => {
    const banner = get("banner");
    const sel = {
      ...createInitialSelection(banner),
      variantId: "albatros",
      widthCm: "300",
      heightCm: "150",
      quantity: "2",
    };
    const est = calculateEstimate(banner, sel);
    if (est.status !== "estimate") throw new Error("harus estimasi");
    expect(est.total).toBe(900000);
  });

  it("banner tidak valid tanpa ukuran", () => {
    const banner = get("banner");
    const est = calculateEstimate(banner, createInitialSelection(banner));
    expect(est.status).toBe("invalid");
  });

  it("produk harga tetap: harga × jumlah", () => {
    const stiker = get("stiker");
    const est = calculateEstimate(stiker, { ...createInitialSelection(stiker), variantId: "vinyl", quantity: "3" });
    if (est.status !== "estimate") throw new Error("harus estimasi");
    expect(est.total).toBe(60000);
  });

  it("nota & inquiry tidak menghasilkan total", () => {
    const nota = get("nota");
    expect(calculateEstimate(nota, createInitialSelection(nota)).status).toBe("starting");
    const rollup = get("roll-up-banner");
    expect(calculateEstimate(rollup, createInitialSelection(rollup)).status).toBe("inquiry");
  });
});

describe("whatsapp", () => {
  it("validasi nomor", () => {
    expect(isValidWhatsappNumber("6289656112061")).toBe(true);
    expect(isValidWhatsappNumber("+6289656112061")).toBe(false);
    expect(isValidWhatsappNumber("089656112061")).toBe(false);
    expect(isValidWhatsappNumber("")).toBe(false);
  });

  it("pesan banner sesuai contoh", () => {
    const banner = get("banner");
    const sel = {
      ...createInitialSelection(banner),
      widthCm: "200",
      heightCm: "100",
      notes: "Untuk banner toko",
    };
    const msg = buildProductMessage(banner, sel, calculateEstimate(banner, sel));
    expect(msg).toBe(
      [
        "Halo Belezza Printing, saya ingin bertanya/pesan:",
        "",
        "Produk: Banner",
        "Bahan: Flexy China",
        "Ukuran: 200 × 100 cm",
        "Jumlah: 1",
        "Harga dasar: Rp20.000/m²",
        "Estimasi biaya cetak: Rp40.000",
        "Catatan: Untuk banner toko",
        "",
        "Mohon konfirmasi harga akhir, spesifikasi, dan estimasi waktu pengerjaannya. Terima kasih.",
      ].join("\n"),
    );
  });

  it("pesan nota dan inquiry", () => {
    const nota = get("nota");
    const sel = createInitialSelection(nota);
    const msg = buildProductMessage(nota, sel, calculateEstimate(nota, sel));
    expect(msg).toContain("Harga awal: Mulai Rp120.000; harga akhir perlu dikonfirmasi");
    expect(msg).not.toContain("Jumlah: 1");

    const desain = get("jasa-desain-grafis");
    const dsel = { ...createInitialSelection(desain), requirements: { jenis: "Logo", deskripsi: "" } };
    const dmsg = buildProductMessage(desain, dsel, calculateEstimate(desain, dsel));
    expect(dmsg).toContain("Harga: Mohon penawaran");
    expect(dmsg).toContain("Jenis desain: Logo");
    expect(dmsg).not.toContain("Deskripsi kebutuhan desain");
  });

  it("URL di-encode penuh", () => {
    const url = buildWhatsappUrl("6289656112061", "Halo & m²\nBaris");
    expect(url).toBe("https://wa.me/6289656112061?text=Halo%20%26%20m%C2%B2%0ABaris");
  });
});
