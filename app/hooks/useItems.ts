import { useQuery } from '@tanstack/react-query';
import type { Item } from '../types/item.types';

const fetchItems = async (categoryId: number): Promise<Item[]> => {
  const response = await fetch(`/api/items/${categoryId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch items');
  }
  return response.json();
};

export const useItems = (categoryId: number | null) => {
  return useQuery({
    queryKey: ['items', categoryId],
    queryFn: () => fetchItems(categoryId!),
    enabled: categoryId !== null, // Only fetch when categoryId is provided
  });
};

