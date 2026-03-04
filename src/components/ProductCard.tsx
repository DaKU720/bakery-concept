"use client";

import { useCartStore } from "@/store/cart";
import { useToastStore } from "@/store/toast";
import { Plus, Minus } from "lucide-react";
import Link from "next/link";
import { Product } from "@/data/products";

export function ProductCard({ product }: { product: Product }) {
    const { items, addItem, updateQuantity } = useCartStore();
    const { showToast } = useToastStore();

    const hasOptions = Array.isArray(product.options) && product.options.length > 0;

    const quantity = items
        .filter((item) => item.id === product.id)
        .reduce((acc, item) => acc + item.quantity, 0);

    return (
        <div className={`relative bg-white rounded-2xl shadow-sm border border-orange-50/50 overflow-hidden flex flex-col h-full group ${product.isSoldOut ? 'opacity-75 grayscale-[0.5]' : ''}`}>
            <div className="block relative aspect-[4/3] w-full bg-orange-50/30 overflow-hidden">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {product.isSoldOut && (
                    <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px] flex items-center justify-center">
                        <span className="bg-foreground text-white font-black px-4 py-2 rounded-full transform -rotate-12 shadow-lg z-10">
                            WYPRZEDANE
                        </span>
                    </div>
                )}
            </div>
            <div className="p-4 flex flex-col flex-1">
                <Link href={`/product/${product.id}`} className="font-bold text-lg mb-1 hover:text-primary transition-colors cursor-pointer block after:absolute after:inset-0 after:z-0">
                    {product.name}
                </Link>
                <p className="text-foreground/70 text-sm mb-3 flex-1">
                    {product.description}
                </p>

                <div className="mt-auto relative z-10">
                    <div className="flex items-center justify-between font-medium text-sm text-foreground/80 mb-3 bg-orange-50/50 p-2 rounded-lg">
                        <span className={product.isSoldOut ? 'line-through opacity-50' : ''}>{product.price.toFixed(2)} zł</span>
                        <span className="text-xs">{product.unit}</span>
                    </div>

                    {product.isSoldOut ? (
                        <button
                            disabled
                            className="w-full h-12 rounded-xl bg-gray-200 text-gray-400 font-bold flex items-center justify-center cursor-not-allowed"
                        >
                            Niedostępne
                        </button>
                    ) : hasOptions ? (
                        <Link
                            href={`/product/${product.id}`}
                            className="w-full h-12 rounded-xl bg-foreground text-white font-bold flex items-center justify-center gap-2 hover:bg-foreground/90 transition-colors shadow-sm active:scale-95 cursor-pointer"
                        >
                            Wybierz opcje
                        </Link>
                    ) : !quantity ? (
                        <button
                            onClick={() => {
                                addItem(product);
                                showToast(`🍞 Dodano ${product.name} do koszyka!`);
                            }}
                            className="w-full h-12 rounded-xl bg-primary text-white font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors shadow-sm active:scale-95 cursor-pointer"
                        >
                            <Plus size={20} /> Dodaj
                        </button>
                    ) : (
                        <div className="flex items-center justify-between h-12 bg-success/20 rounded-xl px-2 font-bold text-foreground">
                            <button
                                onClick={() => {
                                    const cartItem = items.find(i => i.id === product.id);
                                    if (cartItem) updateQuantity(cartItem.cartItemId, -1);
                                }}
                                className="w-10 h-10 flex items-center justify-center bg-white rounded-lg shadow-sm active:scale-95"
                            >
                                <Minus size={20} />
                            </button>
                            <span className="w-10 text-center">{quantity}</span>
                            <button
                                onClick={() => {
                                    const cartItem = items.find(i => i.id === product.id);
                                    if (cartItem) {
                                        updateQuantity(cartItem.cartItemId, 1);
                                        showToast(`➕ Zwiększono ilość`);
                                    }
                                }}
                                className="w-10 h-10 flex items-center justify-center bg-white rounded-lg shadow-sm active:scale-95"
                            >
                                <Plus size={20} />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
