export interface CartItem {
  id: string;
  qty: number;
  price: number;
  name: string;
}

export interface CartContextValue {
  cartItems: CartItem[];
  increaseProductQty: (id: string, price: number, name: string) => void;
  decreaseProductQty: (id: string) => void;
  getProductQty: (id: string) => number;
  deleteProduct: (id: string) => void;
  totalPrice: number;
  rollbackLastAction: () => void;
  getProductTotal: (id: string) => number;
}

