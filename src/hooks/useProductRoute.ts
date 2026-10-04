import { useCallback, useEffect, useState } from "react";
import { getProductById } from "../data/products";

/**
 * Rute ringan berbasis hash untuk detail produk: #produk/<id>.
 * Pelanggan bisa membagikan/membuka tautan produk secara langsung tanpa
 * memilih kategori lebih dulu. Tidak memerlukan library router.
 */
const PREFIX = "#produk/";

function readProductId(): string | null {
  const { hash } = window.location;
  if (!hash.startsWith(PREFIX)) return null;
  const id = decodeURIComponent(hash.slice(PREFIX.length));
  return getProductById(id) ? id : null;
}

function safeHistory(action: "push" | "replace", url: string) {
  try {
    if (action === "push") window.history.pushState(null, "", url);
    else window.history.replaceState(null, "", url);
  } catch {
    // Beberapa lingkungan (mis. iframe sandbox) membatasi History API — abaikan.
  }
}

export function useProductRoute() {
  const [productId, setProductId] = useState<string | null>(() => readProductId());

  useEffect(() => {
    const sync = () => setProductId(readProductId());
    window.addEventListener("hashchange", sync);
    window.addEventListener("popstate", sync);
    return () => {
      window.removeEventListener("hashchange", sync);
      window.removeEventListener("popstate", sync);
    };
  }, []);

  const openProduct = useCallback((id: string) => {
    safeHistory("push", `${PREFIX}${encodeURIComponent(id)}`);
    setProductId(id);
  }, []);

  const closeProduct = useCallback(() => {
    if (window.location.hash.startsWith(PREFIX)) {
      safeHistory("replace", `${window.location.pathname}${window.location.search}#katalog`);
    }
    setProductId(null);
  }, []);

  return { productId, openProduct, closeProduct };
}
