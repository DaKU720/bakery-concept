"use client";

import { useToastStore } from "@/store/toast";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, X } from "lucide-react";

export function ToastProvider() {
    const { toasts, removeToast } = useToastStore();

    return (
        <div className="fixed bottom-safe-4 left-4 right-4 z-[999] flex flex-col gap-2 pointer-events-none pb-24 md:pb-4 md:left-auto md:w-96">
            <AnimatePresence>
                {toasts.map((toast) => (
                    <motion.div
                        key={toast.id}
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                        className="bg-[#3E2723] text-white px-4 py-3 rounded-2xl shadow-xl flex items-center justify-between pointer-events-auto"
                    >
                        <div className="flex items-center gap-3">
                            <CheckCircle2 className="text-[#A8E6CF]" size={20} />
                            <span className="font-medium text-sm md:text-base">{toast.message}</span>
                        </div>
                        <button
                            onClick={() => removeToast(toast.id)}
                            className="text-white/60 hover:text-white transition-colors"
                        >
                            <X size={18} />
                        </button>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}
