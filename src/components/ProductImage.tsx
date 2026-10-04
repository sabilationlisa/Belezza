import { useState } from "react";
import type { Product } from "../types/product";
import { ProductMockup } from "./ProductMockup";

interface ProductImageProps {
  product: Product;
  className?: string;
  /** Tampilkan label kecil "Ilustrasi" saat yang tampil adalah mockup. */
  showIllustrationTag?: boolean;
}

/**
 * Gambar produk dengan rasio 4:3 yang konsisten (object-cover, tidak pernah
 * melar). Memakai foto asli bila tersedia; jika tidak ada atau gagal dimuat,
 * otomatis kembali ke ilustrasi mockup.
 */
export function ProductImage({ product, className = "", showIllustrationTag = false }: ProductImageProps) {
  const [failed, setFailed] = useState(false);
  const usePhoto = Boolean(product.image) && !failed;

  return (
    <div className={`relative aspect-[4/3] overflow-hidden bg-slate-100 ${className}`}>
      {usePhoto ? (
        <img
          src={product.image}
          alt={`Foto produk ${product.name}`}
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover"
        />
      ) : (
        <>
          <ProductMockup kind={product.mockup} className="h-full w-full" />
          {showIllustrationTag && (
            <span className="absolute bottom-3 left-3 rounded-md bg-white/90 px-2 py-1 text-xs font-medium text-muted shadow-sm">
              Ilustrasi produk
            </span>
          )}
        </>
      )}
    </div>
  );
}
