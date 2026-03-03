"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Wrench, Sparkles } from "lucide-react";

export function WelcomeModal() {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        // Show once per session
        const hasSeenWelcome = sessionStorage.getItem("hasSeenWelcome");
        if (!hasSeenWelcome) {
            // Small delay to let the page load first for better UX
            const timer = setTimeout(() => setIsOpen(true), 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleClose = () => {
        setIsOpen(false);
        sessionStorage.setItem("hasSeenWelcome", "true");
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-md flex items-center justify-center p-4"
                    >
                        {/* Modal */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                            className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-6 md:p-8 max-w-md w-full relative relative overflow-hidden"
                        >
                            {/* Decorative background element */}
                            <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl pointer-events-none"></div>

                            <button
                                onClick={handleClose}
                                className="absolute top-4 right-4 p-2 text-foreground/50 hover:text-foreground hover:bg-gray-100 rounded-full transition-colors z-10"
                            >
                                <X size={24} />
                            </button>

                            <div className="flex flex-col items-center text-center mt-2">
                                <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-orange-100 text-primary">
                                    <Wrench size={32} />
                                </div>

                                <h2 className="text-2xl font-black mb-3">Wersja Podglądowa</h2>

                                <p className="text-foreground/70 mb-6 leading-relaxed">
                                    Witaj w domowej pracowni <strong>"Słodka Ola"</strong>! <br /><br />
                                    Ta strona to prototyp / aplikacja testowa. Zamówienia składane w ten sposób są testowe i służą do sprawdzenia działania wspaniałych animacji i UX.
                                </p>

                                <button
                                    onClick={handleClose}
                                    className="w-full h-14 bg-foreground text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-foreground/90 transition-all active:scale-95 shadow-md shadow-foreground/10"
                                >
                                    <Sparkles size={20} />
                                    Rozumiem, chcę przeglądać!
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
