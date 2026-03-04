"use client";

import { useCartStore } from "@/store/cart";
import { Plus, Minus, Trash2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function CartDrawer() {
    const { items, isCartOpen, closeCart, updateQuantity, removeItem, openCheckout, deliveryMethod, setDeliveryMethod } = useCartStore();

    const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const boxFee = 6;
    const deliveryFee = deliveryMethod === 'delivery' ? 15 : 0;
    const total = subtotal + (subtotal > 0 ? deliveryFee + boxFee : 0);

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeCart}
                        className="fixed inset-0 bg-foreground/40 z-50 backdrop-blur-sm"
                    />

                    {/* Bottom Sheet */}
                    <motion.div
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed inset-x-0 bottom-0 z-50 bg-background rounded-t-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="cart-drawer-title"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-gray-100">
                            <h2 id="cart-drawer-title" className="text-2xl font-black text-foreground">Koszyk</h2>
                            <button
                                aria-label="Zamknij koszyk"
                                onClick={closeCart}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            {items.length === 0 ? (
                                <div className="text-center text-foreground/50 py-10 flex flex-col items-center">
                                    <div className="text-4xl mb-4">🥐</div>
                                    <p>Twój koszyk jest pusty.</p>
                                    <p className="text-sm">Dodaj pyszne wypieki!</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {items.map((item) => (
                                        <div key={item.cartItemId} className="flex gap-4 items-start bg-white p-4 rounded-2xl shadow-sm border border-gray-50">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-20 h-20 object-cover rounded-xl mt-1"
                                            />
                                            <div className="flex-1 min-w-0">
                                                <h4 className="font-bold leading-tight mb-1">{item.name}</h4>
                                                <p className="text-xs text-foreground/60 mb-2">{item.unit}</p>

                                                {/* Selected Options */}
                                                {item.selectedOptions && Object.keys(item.selectedOptions).length > 0 && (
                                                    <div className="mb-2 space-y-1">
                                                        {Object.entries(item.selectedOptions).map(([key, value]) => (
                                                            <div key={key} className="text-xs text-foreground/80 font-medium flex items-center before:content-[''] before:w-1 before:h-1 before:bg-primary before:rounded-full before:mr-2">
                                                                {value}
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}

                                                {/* Notes */}
                                                {item.notes && (
                                                    <p className="text-xs bg-orange-50/50 p-2 rounded-lg italic text-foreground/70 mb-2 mt-2">
                                                        "{item.notes}"
                                                    </p>
                                                )}

                                                <p className="font-black text-sm text-primary mt-1">{item.price.toFixed(2)} zł</p>
                                            </div>

                                            <div className="flex flex-col gap-2 items-end justify-between self-stretch">
                                                <button
                                                    onClick={() => removeItem(item.cartItemId)}
                                                    className="p-1 text-foreground/40 hover:text-red-500 transition-colors"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                                <div className="flex items-center gap-1 bg-gray-50 rounded-lg p-1 mt-auto">
                                                    <button
                                                        onClick={() => updateQuantity(item.cartItemId, -1)}
                                                        className="w-8 h-8 flex items-center justify-center bg-white rounded shadow-sm"
                                                    >
                                                        <Minus size={16} />
                                                    </button>
                                                    <span className="w-6 text-center text-sm font-bold">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.cartItemId, 1)}
                                                        className="w-8 h-8 flex items-center justify-center bg-white rounded shadow-sm text-primary"
                                                    >
                                                        <Plus size={16} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Delivery Options & Summary */}
                            {items.length > 0 && (
                                <div className="mt-6 space-y-6">
                                    {/* Delivery Picker */}
                                    <div>
                                        <h3 className="text-lg font-bold mb-3">Wybierz sposób odbioru</h3>
                                        <div className="flex bg-gray-100/80 p-1 rounded-2xl">
                                            <button
                                                onClick={() => setDeliveryMethod('pickup')}
                                                className={`flex-1 py-3 px-2 rounded-xl text-center text-sm font-bold transition-all ${deliveryMethod === 'pickup' ? 'bg-white shadow-sm text-foreground' : 'text-foreground/50 hover:text-foreground/80'}`}
                                            >
                                                Odbiór (0 zł)
                                            </button>
                                            <button
                                                onClick={() => setDeliveryMethod('delivery')}
                                                className={`flex-1 py-3 px-2 rounded-xl text-center text-sm font-bold transition-all ${deliveryMethod === 'delivery' ? 'bg-white shadow-sm text-foreground' : 'text-foreground/50 hover:text-foreground/80'}`}
                                            >
                                                Dowóz (15 zł)
                                            </button>
                                        </div>
                                    </div>

                                    {/* Summary */}
                                    <div className="bg-orange-50/50 rounded-2xl p-4">
                                        <div className="flex justify-between mb-2 text-sm">
                                            <span className="text-foreground/70">Wartość produktów</span>
                                            <span className="font-medium">{subtotal.toFixed(2)} zł</span>
                                        </div>
                                        <div className="flex justify-between mb-2 text-sm">
                                            <span className="text-foreground/70">Opakowanie (pudełko)</span>
                                            <span className="font-medium">{boxFee.toFixed(2)} zł</span>
                                        </div>
                                        <div className="flex justify-between mb-4 text-sm border-b border-gray-200 pb-4">
                                            <span className="text-foreground/70">Koszt dostawy</span>
                                            <span className="font-medium">{deliveryFee > 0 ? `${deliveryFee.toFixed(2)} zł` : '0.00 zł'}</span>
                                        </div>
                                        <div className="flex justify-between font-black text-xl">
                                            <span>Suma całkowita</span>
                                            <span className="text-primary">{total.toFixed(2)} zł</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Bottom Bar */}
                        <div className="p-6 bg-white border-t border-gray-100 shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
                            <button
                                disabled={items.length === 0}
                                onClick={openCheckout}
                                className="w-full h-16 bg-primary text-white rounded-2xl font-black text-lg flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/95 transition-all active:scale-95 shadow-lg shadow-primary/20"
                            >
                                Idź do kasy <span>→</span>
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
