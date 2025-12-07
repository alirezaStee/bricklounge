'use client';

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from 'react';
import type { CartItem, CartContextValue } from '../types/cart.types';

export const CartContext = createContext<CartContextValue | null>(null);

export const useCartContext = (): CartContextValue => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCartContext must be used within CartContextProvider');
  }
  return context;
};

interface CartContextProviderProps {
  children: React.ReactNode;
}

export default function CartContextProvider({
  children,
}: CartContextProviderProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [lastAction, setLastAction] = useState<CartItem[] | null>(null);

  const increaseProductQty = useCallback(
    (id: string, price: number, name: string) => {
      setCartItems((prev) => {
        setLastAction(prev);
        const existingItem = prev.find((item) => item.id === id);

        if (existingItem) {
          return prev.map((item) =>
            item.id === id ? { ...item, qty: item.qty + 1 } : item
          );
        }

        return [...prev, { id, qty: 1, price, name }];
      });
    },
    []
  );

  const decreaseProductQty = useCallback((id: string) => {
    setCartItems((prev) => {
      setLastAction(prev);
      const item = prev.find((item) => item.id === id);

      if (!item) return prev;

      if (item.qty === 1) {
        return prev.filter((item) => item.id !== id);
      }

      return prev.map((item) =>
        item.id === id ? { ...item, qty: item.qty - 1 } : item
      );
    });
  }, []);

  const getProductQty = useCallback(
    (id: string): number => {
      const item = cartItems.find((item) => item.id === id);
      return item?.qty ?? 0;
    },
    [cartItems]
  );

  const deleteProduct = useCallback((id: string) => {
    setCartItems((prev) => {
      setLastAction(prev);
      return prev.filter((item) => item.id !== id);
    });
  }, []);

  const getProductTotal = useCallback(
    (id: string): number => {
      const item = cartItems.find((item) => item.id === id);
      return item ? item.price * item.qty : 0;
    },
    [cartItems]
  );

  const rollbackLastAction = useCallback(() => {
    if (lastAction) {
      setCartItems(lastAction);
      setLastAction(null);
    }
  }, [lastAction]);

  const totalPrice = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  }, [cartItems]);

  const value: CartContextValue = useMemo(
    () => ({
      cartItems,
      increaseProductQty,
      decreaseProductQty,
      getProductQty,
      deleteProduct,
      totalPrice,
      rollbackLastAction,
      getProductTotal,
    }),
    [
      cartItems,
      increaseProductQty,
      decreaseProductQty,
      getProductQty,
      deleteProduct,
      totalPrice,
      rollbackLastAction,
      getProductTotal,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
