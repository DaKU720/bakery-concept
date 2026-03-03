import { create } from 'zustand';
import { Product } from '@/data/products';

export interface CartItem extends Product {
    cartItemId: string;
    quantity: number;
    selectedOptions?: Record<string, string>;
    notes?: string;
}

interface CartStore {
    items: CartItem[];
    isCartOpen: boolean;
    isCheckoutOpen: boolean;
    addItem: (product: Product, quantity?: number, selectedOptions?: Record<string, string>, notes?: string) => void;
    removeItem: (cartItemId: string) => void;
    updateQuantity: (cartItemId: string, delta: number) => void;
    openCart: () => void;
    closeCart: () => void;
    openCheckout: () => void;
    closeCheckout: () => void;
    clearCart: () => void;
}

export const useCartStore = create<CartStore>((set) => ({
    items: [],
    isCartOpen: false,
    isCheckoutOpen: false,
    addItem: (product, quantity = 1, selectedOptions = {}, notes = "") => set((state) => {
        // Check if an item with exactly the same product ID, options, and notes already exists
        const existing = state.items.find(item =>
            item.id === product.id &&
            JSON.stringify(item.selectedOptions || {}) === JSON.stringify(selectedOptions) &&
            (item.notes || "") === notes
        );

        if (existing) {
            return {
                items: state.items.map(item =>
                    item.cartItemId === existing.cartItemId
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                ),
            };
        }

        // Create new unique cart item ID
        const cartItemId = `${product.id}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        return { items: [...state.items, { ...product, cartItemId, quantity, selectedOptions, notes }] };
    }),
    removeItem: (cartItemId) => set((state) => ({
        items: state.items.filter(item => item.cartItemId !== cartItemId),
    })),
    updateQuantity: (cartItemId, delta) => set((state) => ({
        items: state.items.map(item => {
            if (item.cartItemId === cartItemId) {
                const newQuantity = item.quantity + delta;
                return { ...item, quantity: newQuantity > 0 ? newQuantity : 1 };
            }
            return item;
        }),
    })),
    openCart: () => set({ isCartOpen: true }),
    closeCart: () => set({ isCartOpen: false }),
    openCheckout: () => set({ isCheckoutOpen: true, isCartOpen: false }),
    closeCheckout: () => set({ isCheckoutOpen: false }),
    clearCart: () => set({ items: [] }),
}));
