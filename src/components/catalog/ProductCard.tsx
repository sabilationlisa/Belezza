import { getCategoryName } from "../../data/products";
import { getCatalogPriceLabel } from "../../lib/pricing";
import type { Product } from "../../types/product";
import { ProductImage } from "../ProductImage";
import { buttonClass } from "../ui/button";
import { ArrowRightIcon } from "../ui/Icons";

interface ProductCardProps {
  product: Product;
  onOpen: (id: string) => void;
}

export function ProductCard({ product, onOpen }: ProductCardProps) {
  const isInquiry = product.pricing.model === "inquiry";
  const titleId = `produk-${product.id}-judul`;

  return (
    <article
      aria-labelledby={titleId}
      className="group flex w-full flex-col overflow-hidden rounded-xl border border-line bg-white shadow-card transition-shadow hover:shadow-lift"
    >
      <button
        type="button"
        tabIndex={-1}
        aria-hidden="true"
        onClick={() => onOpen(product.id)}
        className="block overflow-hidden"
      >
        <ProductImage product={product} className="transition-transform duration-300 group-hover:scale-[1.02]" />
      </button>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted">{getCategoryName(product.categoryId)}</p>
        <h3 id={titleId} className="mt-1.5 text-xl font-semibold text-ink">
          {product.name}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{product.shortDescription}</p>
        <div className="mt-5 flex items-end justify-between gap-3 border-t border-line pt-4">
          <p className={`font-heading text-lg font-bold ${isInquiry ? "text-muted" : "text-ink"}`}>
            {getCatalogPriceLabel(product)}
          </p>
          <button type="button" onClick={() => onOpen(product.id)} className={buttonClass("secondary", "sm", "shrink-0")}>
            Lihat Detail
            <span className="sr-only"> {product.name}</span>
            <ArrowRightIcon width={16} height={16} />
          </button>
        </div>
      </div>
    </article>
  );
}
