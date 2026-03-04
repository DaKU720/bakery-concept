import { TopNavbar } from "@/components/TopNavbar";
import { CartDrawer } from "@/components/CartDrawer";
import { CheckoutModal } from "@/components/CheckoutModal";
import { ProductCatalog } from "@/components/ProductCatalog";

export default function Home() {
  return (
    <>
      <TopNavbar />

      <main className="max-w-7xl mx-auto px-4 pb-24 pt-6">
        {/* Hero Section */}
        <section className="mb-8">
          <div className="bg-primary/10 rounded-3xl p-6 relative overflow-hidden flex flex-col justify-center min-h-[160px]">
            <div className="relative z-10 w-2/3">
              <span className="inline-block px-3 py-1 bg-primary text-white text-xs font-bold rounded-full mb-3 shadow-md">
                PROMO
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-foreground mb-2">
                Dziś do kawy <span className="text-primary">-10%</span>
              </h2>
              <p className="text-sm font-medium text-foreground/80">
                Na wszystkie drobne wypieki i ciastka
              </p>
            </div>
            {/* Decorative Vector Graphic */}
            <div className="absolute -right-4 -bottom-4 text-9xl opacity-20 transform -rotate-12 translate-x-4">
              ☕
            </div>
          </div>
        </section>

        {/* Categories & Product Grid (Interactive Client Component) */}
        <ProductCatalog />
      </main>

      <CartDrawer />
      <CheckoutModal />
    </>
  );
}
