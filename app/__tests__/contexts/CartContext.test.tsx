import { renderHook, act } from '@testing-library/react';
import CartContextProvider, { useCartContext } from '../../contexts/CartContext';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <CartContextProvider>{children}</CartContextProvider>
);

describe('CartContext', () => {
  it('should initialize with empty cart', () => {
    const { result } = renderHook(() => useCartContext(), { wrapper });

    expect(result.current.cartItems).toEqual([]);
    expect(result.current.totalPrice).toBe(0);
  });

  it('should add product to cart with increaseProductQty', () => {
    const { result } = renderHook(() => useCartContext(), { wrapper });

    act(() => {
      result.current.increaseProductQty('1', 1000, 'Product 1');
    });

    expect(result.current.cartItems).toHaveLength(1);
    expect(result.current.cartItems[0]).toEqual({
      id: '1',
      qty: 1,
      price: 1000,
      name: 'Product 1',
    });
    expect(result.current.totalPrice).toBe(1000);
  });

  it('should increase quantity when product already exists', () => {
    const { result } = renderHook(() => useCartContext(), { wrapper });

    act(() => {
      result.current.increaseProductQty('1', 1000, 'Product 1');
    });

    act(() => {
      result.current.increaseProductQty('1', 1000, 'Product 1');
    });

    expect(result.current.cartItems).toHaveLength(1);
    expect(result.current.cartItems[0].qty).toBe(2);
    expect(result.current.totalPrice).toBe(2000);
  });

  it('should decrease product quantity', () => {
    const { result } = renderHook(() => useCartContext(), { wrapper });

    act(() => {
      result.current.increaseProductQty('1', 1000, 'Product 1');
      result.current.increaseProductQty('1', 1000, 'Product 1');
    });

    act(() => {
      result.current.decreaseProductQty('1');
    });

    expect(result.current.cartItems[0].qty).toBe(1);
    expect(result.current.totalPrice).toBe(1000);
  });

  it('should remove product when quantity reaches 0', () => {
    const { result } = renderHook(() => useCartContext(), { wrapper });

    act(() => {
      result.current.increaseProductQty('1', 1000, 'Product 1');
    });

    act(() => {
      result.current.decreaseProductQty('1');
    });

    expect(result.current.cartItems).toHaveLength(0);
    expect(result.current.totalPrice).toBe(0);
  });

  it('should get product quantity', () => {
    const { result } = renderHook(() => useCartContext(), { wrapper });

    act(() => {
      result.current.increaseProductQty('1', 1000, 'Product 1');
      result.current.increaseProductQty('1', 1000, 'Product 1');
    });

    expect(result.current.getProductQty('1')).toBe(2);
    expect(result.current.getProductQty('2')).toBe(0);
  });

  it('should delete product', () => {
    const { result } = renderHook(() => useCartContext(), { wrapper });

    act(() => {
      result.current.increaseProductQty('1', 1000, 'Product 1');
      result.current.increaseProductQty('2', 2000, 'Product 2');
    });

    act(() => {
      result.current.deleteProduct('1');
    });

    expect(result.current.cartItems).toHaveLength(1);
    expect(result.current.cartItems[0].id).toBe('2');
  });

  it('should calculate total price correctly', () => {
    const { result } = renderHook(() => useCartContext(), { wrapper });

    act(() => {
      result.current.increaseProductQty('1', 1000, 'Product 1');
      result.current.increaseProductQty('1', 1000, 'Product 1');
      result.current.increaseProductQty('2', 2000, 'Product 2');
    });

    expect(result.current.totalPrice).toBe(4000);
  });

  it('should get product total', () => {
    const { result } = renderHook(() => useCartContext(), { wrapper });

    act(() => {
      result.current.increaseProductQty('1', 1000, 'Product 1');
      result.current.increaseProductQty('1', 1000, 'Product 1');
    });

    expect(result.current.getProductTotal('1')).toBe(2000);
    expect(result.current.getProductTotal('2')).toBe(0);
  });

  it('should rollback last action', () => {
    const { result } = renderHook(() => useCartContext(), { wrapper });

    act(() => {
      result.current.increaseProductQty('1', 1000, 'Product 1');
    });

    const previousState = [...result.current.cartItems];

    act(() => {
      result.current.increaseProductQty('2', 2000, 'Product 2');
    });

    expect(result.current.cartItems).toHaveLength(2);

    act(() => {
      result.current.rollbackLastAction();
    });

    expect(result.current.cartItems).toEqual(previousState);
  });
});

