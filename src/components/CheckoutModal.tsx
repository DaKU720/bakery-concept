"use client";

import { useCartStore } from "@/store/cart";
import { useState } from "react";
import { X, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function CheckoutModal() {
    const { isCheckoutOpen, closeCheckout, clearCart } = useCartStore();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({ name: "", phone: "", email: "" });
    const [showSoon, setShowSoon] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (step < 3) {
            setStep(step + 1);
        } else {
            setShowSoon(true);
            setTimeout(() => {
                // clearCart();
                // closeCheckout();
                // setStep(1);
                // setShowSoon(false);
            }, 5000);
        }
    };

    return (
        <AnimatePresence>
            {isCheckoutOpen && (
                <div className="fixed inset-0 z-50 bg-background overflow-hidden flex flex-col">
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-white">
                        <h2 className="text-xl font-black">Kasa (Krok {step}/3)</h2>
                        <button onClick={closeCheckout} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                            <X size={24} />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6">
                        <form id="checkout-form" onSubmit={handleSubmit} className="space-y-6 max-w-lg mx-auto">
                            {step === 1 && (
                                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                                    <h3 className="text-lg font-bold mb-4">1. Dane zamawiającego</h3>
                                    <div className="space-y-4">
                                        <input
                                            type="text"
                                            required
                                            placeholder="Imię i nazwisko"
                                            className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        />
                                        <input
                                            type="tel"
                                            required
                                            placeholder="Telefon"
                                            className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        />
                                        <input
                                            type="email"
                                            placeholder="E-mail (opcjonalnie)"
                                            className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        />
                                        <input
                                            type="text"
                                            required
                                            placeholder="Pełny adres dostawy (ulica, nr, miejscowość)"
                                            className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50"
                                            // Ideally stored in another state like formData.address, expanding it inline:
                                            value={(formData as any).address || ""}
                                            onChange={(e: any) => setFormData({ ...formData, address: e.target.value } as any)}
                                        />
                                    </div>
                                </motion.div>
                            )}

                            {step === 2 && (
                                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                                    <h3 className="text-lg font-bold mb-4">2. Sposób odbioru</h3>
                                    <div className="space-y-3">
                                        <label className="flex items-center gap-3 p-4 border border-primary/20 bg-primary/5 rounded-xl cursor-pointer">
                                            <input type="radio" name="delivery" defaultChecked className="w-5 h-5 text-primary accent-primary" />
                                            <div>
                                                <p className="font-bold">Odbiór osobisty w pracowni</p>
                                                <p className="text-sm text-foreground/60">Legionowo, za darmo</p>
                                            </div>
                                        </label>
                                        <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl cursor-pointer">
                                            <input type="radio" name="delivery" className="w-5 h-5 text-primary accent-primary" />
                                            <div>
                                                <p className="font-bold">Dowóz (Legionowo)</p>
                                                <p className="text-sm text-foreground/60">Od 15.00 zł</p>
                                            </div>
                                        </label>
                                    </div>
                                </motion.div>
                            )}

                            {step === 3 && (
                                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                                    <h3 className="text-lg font-bold mb-4">3. Metoda płatności</h3>
                                    <div className="space-y-3">
                                        {["BLIK", "Karta", "Przelewy24", "PayPo"].map((method, idx) => (
                                            <label key={method} className={`flex items-center gap-3 p-4 border rounded-xl cursor-pointer ${idx === 0 ? 'border-primary/20 bg-primary/5' : 'border-gray-200'}`}>
                                                <input type="radio" name="payment" defaultChecked={idx === 0} className="w-5 h-5 accent-primary" />
                                                <span className="font-bold">{method}</span>
                                            </label>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </form>
                    </div>

                    {/* Sticky Bottom Bar */}
                    <div className="p-6 bg-white border-t border-gray-100 shadow-[0_-10px_30px_rgba(0,0,0,0.05)] pb-safe">
                        <button
                            type="submit"
                            form="checkout-form"
                            className="w-full h-16 bg-primary text-white rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:bg-primary/95 transition-all active:scale-95 shadow-lg shadow-primary/20"
                        >
                            {step < 3 ? "Dalej →" : "Zamawiam i płacę"}
                        </button>
                    </div>

                    {/* SOON Modal Overlay */}
                    <AnimatePresence>
                        {showSoon && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="fixed inset-0 z-[60] bg-background flex flex-col items-center justify-center p-6 text-center"
                            >
                                <div className="text-8xl mb-6 animate-bounce">🍩</div>
                                <h1 className="text-5xl font-black mb-4 text-primary">🚀 SOON ™</h1>
                                <h2 className="text-2xl font-bold mb-4">Moduł płatności jest w trakcie pieczenia!</h2>
                                <p className="text-foreground/70 mb-8 max-w-sm">
                                    Wróć do nas wkrótce, gdy tylko wyciągniemy go z pieca. Dziękujemy!
                                </p>
                                <button
                                    onClick={() => {
                                        setShowSoon(false);
                                        setStep(1);
                                        closeCheckout();
                                        clearCart();
                                    }}
                                    className="w-full max-w-xs h-14 bg-foreground text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-foreground/90 transition-colors"
                                >
                                    <Check size={20} /> Zamknij
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            )}
        </AnimatePresence>
    );
}
