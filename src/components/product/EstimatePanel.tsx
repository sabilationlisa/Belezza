import {
  formatDecimal,
  formatIDR,
  formatUnitPrice,
  getPriceUnit,
  parsePositiveInt,
  type Estimate,
  type Selection,
} from "../../lib/pricing";
import type { Product } from "../../types/product";

/** Ringkasan estimasi biaya dengan status yang jelas untuk tiap model harga. */
export function EstimatePanel({ product, estimate, selection }: { product: Product; estimate: Estimate; selection: Selection }) {
  const { pricing } = product;
  const unit = getPriceUnit(pricing);

  let content;
  switch (estimate.status) {
    case "estimate": {
      const qty = parsePositiveInt(selection.quantity) ?? 1;
      const isArea = pricing.model === "area";
      const qtyUnit = pricing.model === "fixed" && pricing.unit ? ` ${pricing.unit}` : "";
      const breakdown = isArea
        ? `${formatDecimal(estimate.measure ?? 0)} ${unit} × ${formatUnitPrice(estimate.unitPrice, unit)} × ${qty}`
        : `${formatUnitPrice(estimate.unitPrice, unit)} × ${qty}${qtyUnit}`;
      content = (
        <>
          <p className="text-sm font-medium text-muted">{isArea ? "Estimasi biaya cetak" : "Estimasi total"}</p>
          <p className="mt-0.5 font-heading text-3xl font-bold text-ink">{formatIDR(estimate.total)}</p>
          <p className="mt-1 text-sm text-muted">{breakdown}</p>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            {isArea
              ? "Estimasi berdasarkan luas cetak. Harga akhir dan finishing dikonfirmasi melalui WhatsApp."
              : "Ini adalah estimasi. Harga akhir dan spesifikasi dikonfirmasi melalui WhatsApp."}
          </p>
        </>
      );
      break;
    }
    case "invalid":
      content = (
        <>
          <p className="text-sm font-medium text-muted">{pricing.model === "area" ? "Estimasi biaya cetak" : "Estimasi total"}</p>
          <p className="mt-1 text-base font-semibold text-ink">
            {pricing.model === "area"
              ? "Isi ukuran dan jumlah untuk melihat estimasi."
              : "Isi jumlah yang valid untuk melihat estimasi."}
          </p>
        </>
      );
      break;
    case "starting":
      content = (
        <>
          <p className="text-sm font-medium text-muted">Harga awal</p>
          <p className="mt-0.5 font-heading text-3xl font-bold text-ink">Mulai {formatIDR(estimate.startingPrice)}</p>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Harga akhir mengikuti spesifikasi dan dikonfirmasi melalui WhatsApp. Belum ada total yang dihitung.
          </p>
        </>
      );
      break;
    case "inquiry":
      content = (
        <>
          <p className="text-sm font-medium text-muted">Harga</p>
          <p className="mt-0.5 font-heading text-2xl font-bold text-ink">Hubungi untuk harga</p>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Ceritakan kebutuhanmu, lalu admin akan memberikan penawaran melalui WhatsApp.
          </p>
        </>
      );
      break;
  }

  return (
    <div className="rounded-xl border border-line bg-canvas p-4 sm:p-5" aria-live="polite">
      {content}
    </div>
  );
}
