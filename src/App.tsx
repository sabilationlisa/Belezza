import { Catalog } from "./components/catalog/Catalog";
import { Hero } from "./components/Hero";
import { About, Contact, Footer, HowToOrder } from "./components/InfoSections";
import { Navbar } from "./components/Navbar";
import { ProductDialog } from "./components/product/ProductDialog";
import { getProductById } from "./data/products";
import { useProductRoute } from "./hooks/useProductRoute";

export default function App() {
  const { productId, openProduct, closeProduct } = useProductRoute();
  const product = productId ? (getProductById(productId) ?? null) : null;

  return (
    <>
      <a
        href="#katalog"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:shadow-lift"
      >
        Langsung ke katalog
      </a>
      <Navbar />
      <main>
        <Hero />
        <Catalog onOpenProduct={openProduct} />
        <HowToOrder />
        <About />
        <Contact />
      </main>
      <Footer />
      <ProductDialog product={product} onClose={closeProduct} />
    </>
  );
}
