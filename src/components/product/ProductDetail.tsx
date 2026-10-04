import { useRef, useState } from "react";
import { getCategoryName } from "../../data/products";
import {
  calculateEstimate,
  createInitialSelection,
  formatIDR,
  formatUnitPrice,
  getCatalogPriceLabel,
  getPriceUnit,
  getSelectedVariant,
  type FieldKey,
  type Selection,
} from "../../lib/pricing";
import { buildProductMessage } from "../../lib/whatsapp";
import type { Product } from "../../types/product";
import { ProductImage } from "../ProductImage";
import { WhatsAppButton } from "../WhatsAppButton";
import { InfoIcon } from "../ui/Icons";
import { EstimatePanel } from "./EstimatePanel";
import { NumberField, QuantityField, TextField, VariantSelector } from "./FormFields";

/**
 * Isi detail produk. Komponen ini di-mount ulang (key = product.id) setiap kali
 * produk berganti, sehingga pilihan yang tidak relevan otomatis ter-reset.
 */
export function ProductDetail({ product }: { product: Product }) {
  const [sel, setSel] = useState<Selection>(() => createInitialSelection(product));
  const [touched, setTouched] = useState<Partial<Record<FieldKey, boolean>>>({});
  const refs = {
    widthCm: useRef<HTMLInputElement>(null),
    heightCm: useRef<HTMLInputElement>(null),
    quantity: useRef<HTMLInputElement>(null),
  };

  const { pricing } = product;
  const unit = getPriceUnit(pricing);
  const estimate = calculateEstimate(product, sel);
  const errors = estimate.status === "invalid" ? estimate.errors : {};
  const message = buildProductMessage(product, sel, estimate);
  const hasVariants = pricing.model === "area" || pricing.model === "fixed";
  const selectedVariant = hasVariants ? getSelectedVariant(pricing, sel.variantId) : null;

  const update = <K extends keyof Selection>(key: K, value: Selection[K]) => setSel((s) => ({ ...s, [key]: value }));
  const touch = (k: FieldKey) => setTouched((t) => ({ ...t, [k]: true }));
  const errorFor = (k: FieldKey) => (touched[k] ? errors[k] : undefined);

  /** Sebelum membuka WhatsApp: pastikan ukuran/jumlah valid, fokuskan kolom pertama yang salah. */
  const validateBeforeOpen = (): boolean => {
    if (estimate.status !== "invalid") return true;
    setTouched({ widthCm: true, heightCm: true, quantity: true });
    const order: FieldKey[] = ["widthCm", "heightCm", "quantity"];
    const first = order.find((k) => errors[k]);
    if (first) refs[first].current?.focus();
    return false;
  };

  const headlinePrice = selectedVariant ? formatUnitPrice(selectedVariant.price, unit) : getCatalogPriceLabel(product);
  const ctaLabel = pricing.model === "area" || pricing.model === "fixed" ? "Pesan via WhatsApp" : "Tanya via WhatsApp";
  const titleId = "detail-produk-judul";

  return (
    <div className="grid md:grid-cols-[1fr_1.1fr]">
      {/* Kolom gambar */}
      <div className="bg-canvas p-4 sm:p-6 md:border-r md:border-line">
        <div className="md:sticky md:top-6">
          <ProductImage product={product} showIllustrationTag className="rounded-xl border border-line" />
          <ul className="mt-5 hidden space-y-2 md:block" aria-label="Ketentuan produk">
            {product.specNotes.map((n) => (
              <li key={n} className="flex gap-2 text-sm leading-relaxed text-muted">
                <InfoIcon width={18} height={18} className="mt-0.5 shrink-0 text-primary" />
                {n}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Kolom informasi & opsi */}
      <div className="flex flex-col">
        <div className="space-y-6 p-5 sm:p-6 lg:p-8">
          <div className="pr-10">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">{getCategoryName(product.categoryId)}</p>
            <h2 id={titleId} className="mt-1 text-2xl font-bold text-ink sm:text-3xl">
              {product.name}
            </h2>
            <p className="mt-2 font-heading text-xl font-bold text-ink">
              {pricing.model === "starting" ? `Mulai ${formatIDR(pricing.startingPrice)}` : headlinePrice}
            </p>
            <p className="mt-3 leading-relaxed text-muted">{product.description}</p>
          </div>

          <form className="space-y-5" onSubmit={(e) => e.preventDefault()} noValidate>
            {hasVariants && pricing.variants.length > 1 && (
              <VariantSelector
                name={`varian-${product.id}`}
                legend={pricing.variantLabel ?? "Varian"}
                variants={pricing.variants}
                unit={unit}
                value={sel.variantId}
                onChange={(id) => update("variantId", id)}
              />
            )}

            {pricing.model === "area" && (
              <div className="grid grid-cols-2 gap-3">
                <NumberField
                  ref={refs.widthCm}
                  id="lebar"
                  label="Lebar"
                  suffix="cm"
                  decimal
                  placeholder="200"
                  value={sel.widthCm}
                  onChange={(v) => update("widthCm", v)}
                  onBlur={() => touch("widthCm")}
                  error={errorFor("widthCm")}
                />
                <NumberField
                  ref={refs.heightCm}
                  id="tinggi"
                  label="Tinggi"
                  suffix="cm"
                  decimal
                  placeholder="100"
                  value={sel.heightCm}
                  onChange={(v) => update("heightCm", v)}
                  onBlur={() => touch("heightCm")}
                  error={errorFor("heightCm")}
                />
              </div>
            )}

            {hasVariants && (
              <QuantityField
                ref={refs.quantity}
                id="jumlah"
                label={pricing.model === "fixed" ? pricing.quantityLabel : "Jumlah"}
                value={sel.quantity}
                onChange={(v) => update("quantity", v)}
                onBlur={() => touch("quantity")}
                error={errorFor("quantity")}
              />
            )}

            {product.requirementFields?.map((f) => (
              <TextField
                key={f.id}
                id={`kebutuhan-${f.id}`}
                label={f.label}
                placeholder={f.placeholder}
                multiline={f.multiline}
                value={sel.requirements[f.id] ?? ""}
                onChange={(v) => update("requirements", { ...sel.requirements, [f.id]: v })}
              />
            ))}

            <TextField
              id="catatan"
              label={
                <>
                  Catatan <span className="font-normal text-muted">(opsional)</span>
                </>
              }
              multiline
              placeholder="Contoh: untuk banner toko, desain sudah ada"
              value={sel.notes}
              onChange={(v) => update("notes", v)}
            />
          </form>

          <ul className="space-y-2 rounded-xl border border-blue-100 bg-blue-50/50 p-4 md:hidden" aria-label="Ketentuan produk">
            {product.specNotes.map((n) => (
              <li key={n} className="flex gap-2 text-sm leading-relaxed text-ink">
                <InfoIcon width={18} height={18} className="mt-0.5 shrink-0 text-primary" />
                {n}
              </li>
            ))}
          </ul>

          <EstimatePanel product={product} estimate={estimate} selection={sel} />
        </div>

        {/* Aksi utama — menempel di bawah agar selalu mudah dijangkau */}
        <div className="sticky bottom-0 mt-auto border-t border-line bg-white/95 px-5 py-4 backdrop-blur sm:px-6 lg:px-8">
          {estimate.status === "estimate" && (
            <p className="mb-2 flex items-baseline justify-between text-sm md:hidden">
              <span className="text-muted">{pricing.model === "area" ? "Estimasi biaya cetak" : "Estimasi total"}</span>
              <span className="font-heading text-lg font-bold text-ink">{formatIDR(estimate.total)}</span>
            </p>
          )}
          <WhatsAppButton
            message={message}
            label={ctaLabel}
            size="lg"
            className="w-full"
            onBeforeOpen={validateBeforeOpen}
          />
          <p className="mt-2 text-center text-xs leading-relaxed text-muted">
            Membuka WhatsApp dengan detail pilihanmu. Pesanan diproses setelah dikonfirmasi bersama admin.
          </p>
        </div>
      </div>
    </div>
  );
}
