'use client';

import { createContext, useContext, useState, useMemo } from 'react';

interface CategoryContextValue {
  selectedCategoryId: number;
  setSelectedCategoryId: (categoryId: number) => void;
}

export const CategoryContext = createContext<CategoryContextValue | null>(null);

export const useCategoryContext = (): CategoryContextValue => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error(
      'useCategoryContext must be used within CategoryProvider'
    );
  }
  return context;
};

interface CategoryProviderProps {
  children: React.ReactNode;
}

export const CategoryProvider = ({ children }: CategoryProviderProps) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(1);

  const value = useMemo(
    () => ({
      selectedCategoryId,
      setSelectedCategoryId,
    }),
    [selectedCategoryId]
  );

  return (
    <CategoryContext.Provider value={value}>
      {children}
    </CategoryContext.Provider>
  );
};
