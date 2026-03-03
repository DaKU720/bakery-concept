"use client";

import { useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { TopNavbar } from "@/components/TopNavbar";
import { CartDrawer } from "@/components/CartDrawer";
import { CheckoutModal } from "@/components/CheckoutModal";
import { mockProducts } from "@/data/products";

export default function Home() {
  const [activeFilter, setActiveFilter] = useState("Wszystko");
  const allCategories = Array.from(new Set(mockProducts.map((p) => p.category)));

  const getFilteredCategories = () => {
    if (activeFilter === "Wszystko") return allCategories;
    if (activeFilter === "Ciasteczka") return allCategories.filter(c => c.toLowerCase().includes("ciasteczka"));
    if (activeFilter === "Torty") return allCategories.filter(c => c.toLowerCase().includes("torty"));
    if (activeFilter === "Wegańskie") return [];
    return allCategories;
  };

  const categoriesToShow = getFilteredCategories();
  const filters = ["Wszystko", "Ciasteczka", "Torty", "Wegańskie"];

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

        {/* Filters (Pills) */}
        <section className="mb-6 -mx-4 overflow-x-auto no-scrollbar">
          <div className="flex gap-3 px-6 w-max pb-2 snap-x">
            {filters.map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`snap-start flex-none px-6 py-2.5 font-bold shadow-sm rounded-full transform transition-all active:scale-95 border ${activeFilter === filter
                  ? "bg-foreground text-white border-foreground"
                  : "bg-white text-foreground border-gray-100 hover:border-primary"
                  }`}
              >
                {filter}
              </button>
            ))}
            {/* Spacer for the right side of the scroller */}
            <div className="w-2 shrink-0"></div>
          </div>
        </section>

        {/* Categories & Product Grid */}
        <div className="space-y-10">
          {categoriesToShow.length === 0 ? (
            <div className="text-center py-12 text-foreground/50">
              <p className="text-4xl mb-4">🥺</p>
              <p className="font-bold">Brak produktów w tej kategorii</p>
            </div>
          ) : (
            categoriesToShow.map((category) => (
              <section key={category}>
                <h2 className="text-2xl font-black mb-6 flex items-center gap-2">
                  {category.includes("Ciasteczka") ? "🍪" : "🎂"} {category}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {mockProducts
                    .filter((p) => p.category === category)
                    .map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                </div>
              </section>
            ))
          )}
        </div>
      </main>

      <CartDrawer />
      <CheckoutModal />
    </>
  );
}
