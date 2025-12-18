import { renderHook, act } from '@testing-library/react';
import { CategoryProvider, useCategoryContext } from '../../contexts/CategoryContext';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <CategoryProvider>{children}</CategoryProvider>
);

describe('CategoryContext', () => {
  it('should provide default selectedCategoryId', () => {
    const { result } = renderHook(() => useCategoryContext(), { wrapper });

    expect(result.current.selectedCategoryId).toBe(1);
  });

  it('should update selectedCategoryId when setSelectedCategoryId is called', () => {
    const { result } = renderHook(() => useCategoryContext(), { wrapper });

    act(() => {
      result.current.setSelectedCategoryId(2);
    });

    expect(result.current.selectedCategoryId).toBe(2);

    act(() => {
      result.current.setSelectedCategoryId(5);
    });

    expect(result.current.selectedCategoryId).toBe(5);
  });

  it('should throw error when used outside provider', () => {
    // Suppress console.error for this test
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => {
      renderHook(() => useCategoryContext());
    }).toThrow('useCategoryContext must be used within CategoryProvider');

    consoleSpy.mockRestore();
  });
});

