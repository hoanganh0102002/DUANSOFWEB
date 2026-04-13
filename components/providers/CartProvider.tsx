"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

export interface CartItem {
  productCode: string;
  slug: string;
  name: string;
  plan: string;
  quantity: number;
  months: number;
  price: number;
  finalPrice: number;
  isHardware: boolean;
}

interface CartContextValue {
  items: CartItem[];
  addItem: (item: CartItem) => boolean;
  removeItem: (productCode: string) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = useCallback((item: CartItem): boolean => {
    try {
      setItems((prev) => {
        const idx = prev.findIndex((i) => i.productCode === item.productCode);
        if (idx >= 0) {
          const next = [...prev];
          next[idx] = { ...next[idx], quantity: next[idx].quantity + item.quantity, finalPrice: next[idx].price * (next[idx].quantity + item.quantity) };
          return next;
        }
        return [...prev, item];
      });
      return true;
    } catch {
      return false;
    }
  }, []);

  const removeItem = useCallback((productCode: string) => {
    setItems((prev) => prev.filter((i) => i.productCode !== productCode));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const totalItems = items.reduce((s, i) => s + i.quantity, 0);
  const totalPrice = items.reduce((s, i) => s + i.finalPrice, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, clearCart, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
