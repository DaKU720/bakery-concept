"use client";

import { useCartStore } from "@/store/cart";
import { ShoppingBag } from "lucide-react";

export function TopNavbar() {
    const { items, openCart } = useCartStore();

    const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md shadow-sm border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                <div className="w-10"></div> {/* Spacer for centering */}

                <div className="flex items-center gap-3">
                    <img src={`${process.env.NODE_ENV === 'production' ? '/bakery-concept' : ''}/images/logo.png`} alt="Oli Emblem" className="w-10 h-10 rounded-full border-2 border-primary shadow-sm object-cover" />
                    <h1 className="text-xl font-bold tracking-tight">Słodka Ola</h1>
                </div>

                <button
                    onClick={openCart}
                    className="relative p-2 -mr-2 text-foreground hover:text-primary transition-colors focus:outline-none"
                >
                    <ShoppingBag size={24} />
                    {totalItems > 0 && (
                        <span className="absolute top-1 right-1 bg-primary text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                            {totalItems}
                        </span>
                    )}
                </button>
            </div>
        </header>
    );
}
