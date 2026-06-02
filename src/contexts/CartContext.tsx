import { createContext, useContext, useState, ReactNode } from "react";

interface CartItem {
  title: string;
  price: string;
  basePrice?: string;
  trainer?: string;
  date?: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (title: string) => void;
}

const CartContext = createContext<CartContextType>({
  items: [],
  addToCart: () => {},
  removeFromCart: () => {},
});

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const addToCart = (item: CartItem) =>
    setItems((prev) => prev.find((i) => i.title === item.title) ? prev : [...prev, item]);
  const removeFromCart = (title: string) =>
    setItems((prev) => prev.filter((i) => i.title !== title));
  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
