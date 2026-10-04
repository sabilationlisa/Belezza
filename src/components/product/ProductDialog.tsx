import { useEffect, useRef } from "react";
import type { Product } from "../../types/product";
import { CloseIcon } from "../ui/Icons";
import { ProductDetail } from "./ProductDetail";

interface ProductDialogProps {
  product: Product | null;
  onClose: () => void;
}

/**
 * Dialog detail produk berbasis <dialog> native (showModal):
 * fokus terkunci di dalam dialog, tombol Esc menutup, dan fokus kembali
 * ke elemen sebelumnya saat ditutup.
 */
export function ProductDialog({ product, onClose }: ProductDialogProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (product && !dialog.open) {
      dialog.showModal();
      document.documentElement.style.overflow = "hidden";
    } else if (!product && dialog.open) {
      dialog.close();
    }
  }, [product]);

  const handleClose = () => {
    document.documentElement.style.overflow = "";
    onClose();
  };

  return (
    <dialog
      ref={ref}
      aria-labelledby="detail-produk-judul"
      onClose={handleClose}
      onClick={(e) => {
        // Klik pada latar (di luar panel) menutup dialog
        if (e.target === e.currentTarget) ref.current?.close();
      }}
      className="fixed inset-0 m-0 h-full max-h-none w-full max-w-none overflow-hidden bg-white p-0 text-ink shadow-lift md:m-auto md:h-fit md:max-h-[calc(100dvh-4rem)] md:w-[calc(100%-4rem)] md:max-w-5xl md:rounded-xl"
    >
      {product && (
        <div className="relative flex h-full max-h-[inherit] flex-col">
          <button
            type="button"
            onClick={() => ref.current?.close()}
            aria-label="Tutup detail produk"
            className="absolute right-3 top-3 z-10 grid h-10 w-10 place-items-center rounded-full border border-line bg-white text-ink shadow-sm hover:bg-slate-50"
          >
            <CloseIcon />
          </button>
          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain md:max-h-[calc(100dvh-4rem)]">
            <ProductDetail key={product.id} product={product} />
          </div>
        </div>
      )}
    </dialog>
  );
}
