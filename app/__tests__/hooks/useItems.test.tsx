import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useItems } from '../../hooks/useItems';
import type { Item } from '../../types/item.types';

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('useItems', () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
  });

  it('should fetch items successfully when categoryId is provided', async () => {
    const mockItems: Item[] = [
      {
        id: '1',
        name: 'Item 1',
        price: 1000,
        image: '/item1.jpg',
        description: 'Description 1',
      },
    ];

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockItems,
    });

    const { result } = renderHook(() => useItems(1), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(mockItems);
    expect(global.fetch).toHaveBeenCalledWith('/api/items/1');
  });

  it('should not fetch when categoryId is null', () => {
    const { result } = renderHook(() => useItems(null), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toBeUndefined();
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('should handle fetch error', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

    const { result } = renderHook(() => useItems(1), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toBeTruthy();
  });

  it('should refetch when categoryId changes', async () => {
    const mockItems1: Item[] = [{ id: '1', name: 'Item 1', price: 1000, image: '/item1.jpg', description: 'Desc 1' }];
    const mockItems2: Item[] = [{ id: '2', name: 'Item 2', price: 2000, image: '/item2.jpg', description: 'Desc 2' }];

    (global.fetch as jest.Mock)
      .mockResolvedValueOnce({ ok: true, json: async () => mockItems1 })
      .mockResolvedValueOnce({ ok: true, json: async () => mockItems2 });

    const { result, rerender } = renderHook(({ categoryId }) => useItems(categoryId), {
      wrapper: createWrapper(),
      initialProps: { categoryId: 1 },
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual(mockItems1);

    rerender({ categoryId: 2 });

    await waitFor(() => expect(result.current.data).toEqual(mockItems2));
    expect(global.fetch).toHaveBeenCalledWith('/api/items/2');
  });
});

