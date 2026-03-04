"use client";

import { useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { mockProducts } from "@/data/products";

export function ProductCatalog() {
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
            <section className="mb-6 -mx-4 overflow-x-auto no-scrollbar">
                <div className="flex gap-3 px-6 w-max pb-2 snap-x" role="tablist" aria-label="Kategorie produktów">
                    {filters.map(filter => (
                        <button
                            key={filter}
                            role="tab"
                            aria-selected={activeFilter === filter}
                            onClick={() => setActiveFilter(filter)}
                            className={`snap-start flex-none px-6 py-2.5 font-bold shadow-sm rounded-full transform transition-all active:scale-95 border focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${activeFilter === filter
                                ? "bg-foreground text-white border-foreground"
                                : "bg-white text-foreground border-gray-100 hover:border-primary"
                                }`}
                        >
                            {filter}
                        </button>
                    ))}
                    <div className="w-2 shrink-0"></div>
                </div>
            </section>

            <div className="space-y-10">
                {categoriesToShow.length === 0 ? (
                    <div className="text-center py-12 text-foreground/50" role="status" aria-live="polite">
                        <p className="text-4xl mb-4" aria-hidden="true">🥺</p>
                        <p className="font-bold">Brak produktów w tej kategorii</p>
                    </div>
                ) : (
                    categoriesToShow.map((category) => (
                        <section key={category} aria-labelledby={`cat-${category}`}>
                            <h2 id={`cat-${category}`} className="text-2xl font-black mb-6 flex items-center gap-2">
                                <span aria-hidden="true">{category.includes("Ciasteczka") ? "🍪" : "🎂"}</span> {category}
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
        </>
    );
}
