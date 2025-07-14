import { create } from 'zustand'


interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number
    image: number
}

interface CartState {
    items: CartItem[];
    addItem: (item: CartItem) => void;
    removeItem: (id: string) => void;
    resetCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
    items: [],
    addItem: (item) => set((state) => ({ items: [...state.items, item] })),
    removeItem: (id) =>
        set((state) => ({ items: state.items.filter((item) => item.id !== id) })),
    resetCart: () => set({ items: [] }),
}));