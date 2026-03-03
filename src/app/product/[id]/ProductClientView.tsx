"use client";

import { useState } from "react";
import { useCartStore } from "@/store/cart";
import { useToastStore } from "@/store/toast";
import { Product } from "@/data/products";
import { ArrowLeft, Check, Plus, Minus, Info } from "lucide-react";
import Link from "next/link";

export function ProductClientView({ product }: { product: Product }) {
    const { addItem } = useCartStore();
    const { showToast } = useToastStore();

    // Default selected options state
    const initialOptions: Record<string, string> = {};
    if (product.options) {
        product.options.forEach(opt => {
            initialOptions[opt.id] = opt.choices[0];
        });
    }

    const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(initialOptions);
    const [notes, setNotes] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [activeImage, setActiveImage] = useState(0);
    const images = product.images || [product.image];

    const handleAddToCart = () => {
        addItem(product, quantity, selectedOptions, notes);
        showToast(`🎉 Sukces! Dodano ${quantity}x ${product.name}`);
        setQuantity(1);
        setNotes("");
    };

    return (
        <div className="flex flex-col md:flex-row gap-8">
            {/* Left: Images */}
            <div className={`w-full md:w-1/2 space-y-4 ${product.isSoldOut ? 'opacity-90 grayscale-[0.3]' : ''}`}>
                <Link href="/" className="inline-flex items-center gap-2 text-foreground/60 hover:text-primary mb-4 transition-colors font-bold">
                    <ArrowLeft size={20} /> Wróć do menu
                </Link>

                <div className="aspect-square bg-orange-50/30 rounded-3xl overflow-hidden shadow-sm border border-orange-100 relative">
                    <img src={images[activeImage]} alt={product.name} className="w-full h-full object-cover" />
                    {product.isSoldOut && (
                        <div className="absolute inset-0 bg-white/50 backdrop-blur-sm flex items-center justify-center">
                            <span className="bg-foreground text-white font-black px-6 py-3 text-xl rounded-full transform -rotate-12 shadow-2xl z-10 border-4 border-white">
                                WYPRZEDANE
                            </span>
                        </div>
                    )}
                </div>

                {images.length > 1 && (
                    <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
                        {images.map((img, idx) => (
                            <button
                                key={idx}
                                onClick={() => setActiveImage(idx)}
                                className={`w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all ${activeImage === idx ? 'border-primary' : 'border-transparent'}`}
                            >
                                <img src={img} alt="" className="w-full h-full object-cover" />
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Right: Info & Controls */}
            <div className="w-full md:w-1/2 flex flex-col pt-2 md:pt-14">
                <div className="inline-flex items-center justify-center px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full mb-4 w-max">
                    {product.category}
                </div>
                <h1 className="text-3xl md:text-4xl font-black mb-2">{product.name}</h1>
                <div className="flex items-end gap-3 mb-6">
                    <span className={`text-3xl font-bold rounded-xl ${product.isSoldOut ? 'opacity-50 line-through' : 'bg-orange-50/50 px-3 py-1'}`}>{product.price.toFixed(2)} zł</span>
                    <span className="text-foreground/50 font-medium mb-1">/ {product.unit}</span>
                </div>

                <p className="text-foreground/80 leading-relaxed mb-6 font-medium">
                    {product.longDescription || product.description}
                </p>

                {/* Ingredients & Allergens */}
                <div className="bg-orange-50/30 rounded-2xl p-5 mb-8 border border-orange-100">
                    <h3 className="font-bold flex items-center gap-2 mb-2"><Info size={18} className="text-primary" /> Skład</h3>
                    <p className="text-sm text-foreground/70 mb-4">{product.ingredients || "Brak informacji o składzie."}</p>

                    <h3 className="font-bold flex items-center gap-2 mb-2 text-sm">🤧 Alergeny</h3>
                    <div className="flex flex-wrap gap-2">
                        {product.allergens && product.allergens.length > 0 ? (
                            product.allergens.map(al => (
                                <span key={al} className="bg-white border border-orange-100 shadow-sm text-xs font-bold px-3 py-1 rounded-full text-foreground/80">
                                    {al}
                                </span>
                            ))
                        ) : (
                            <span className="text-sm text-foreground/50">Brak</span>
                        )}
                    </div>
                </div>

                {/* Options */}
                <div className={product.isSoldOut ? "opacity-50 pointer-events-none" : ""}>
                    {product.options && product.options.map(option => (
                        <div key={option.id} className="mb-6">
                            <h3 className="font-bold mb-3">{option.name}</h3>
                            <div className="space-y-3">
                                {option.choices.map(choice => (
                                    <label key={choice} className={`flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition-colors ${selectedOptions[option.id] === choice ? 'border-primary bg-primary/5 shadow-sm shadow-primary/10' : 'border-gray-200 bg-white hover:border-primary/30'}`}>
                                        <input
                                            type="radio"
                                            name={option.id}
                                            value={choice}
                                            checked={selectedOptions[option.id] === choice}
                                            onChange={() => setSelectedOptions(prev => ({ ...prev, [option.id]: choice }))}
                                            className="w-5 h-5 accent-primary text-primary"
                                        />
                                        <span className="font-bold text-sm md:text-base">{choice}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    ))}

                    {/* Custom Notes */}
                    <div className="mb-8">
                        <h3 className="font-bold mb-3">Uwagi do zamówienia <span className="text-foreground/50 font-normal">(opcjonalnie)</span></h3>
                        <textarea
                            placeholder="np. Proszę o delikatne opakowanie itp..."
                            className="w-full bg-white border border-gray-200 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent resize-none h-24 text-sm shadow-sm"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                        />
                    </div>
                </div>

                {/* Quantity & CTA */}
                <div className="flex gap-4 mt-auto sticky bottom-4 z-10 bg-background/80 backdrop-blur pb-2 pt-2 md:static md:bg-transparent md:backdrop-blur-none">
                    <div className={`flex items-center justify-between h-14 bg-gray-50 border border-gray-100 rounded-xl px-2 font-bold text-foreground w-32 shrink-0 ${product.isSoldOut ? 'opacity-50 pointer-events-none' : ''}`}>
                        <button
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            className="w-10 h-10 flex items-center justify-center bg-white rounded-lg shadow-sm hover:bg-gray-100 active:scale-95 transition-transform"
                        >
                            <Minus size={20} />
                        </button>
                        <span className="text-center w-8 text-lg">{quantity}</span>
                        <button
                            onClick={() => setQuantity(quantity + 1)}
                            className="w-10 h-10 flex items-center justify-center bg-white rounded-lg shadow-sm hover:bg-gray-100 text-primary active:scale-95 transition-transform"
                        >
                            <Plus size={20} />
                        </button>
                    </div>

                    <button
                        disabled={product.isSoldOut}
                        onClick={handleAddToCart}
                        className={`flex-1 h-14 rounded-xl font-black text-lg flex items-center justify-center gap-2 transition-all shadow-lg active:scale-95 ${product.isSoldOut ? 'bg-gray-200 text-gray-500 shadow-none cursor-not-allowed' : 'bg-primary text-white hover:bg-primary/95 shadow-primary/20'}`}
                    >
                        {product.isSoldOut ? 'Niedostępne' : <>Dodaj <span className="hidden sm:inline">za</span> {(product.price * quantity).toFixed(2)} zł</>}
                    </button>
                </div>

            </div>
        </div>
    );
}
