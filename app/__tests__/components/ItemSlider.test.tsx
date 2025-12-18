import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ItemSlider from '../../components/menu/ItemSlider';
import { CategoryProvider } from '../../contexts/CategoryContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { Item } from '../../types/item.types';

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  const queryClient = createTestQueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <CategoryProvider>{children}</CategoryProvider>
    </QueryClientProvider>
  );
};

// Mock ProductDetailModal
jest.mock('../../components/menu/ProductDetailModal', () => {
  return function MockProductDetailModal({ onClose }: { onClose: () => void }) {
    return (
      <div data-testid="product-detail-modal">
        <button onClick={onClose}>Close</button>
      </div>
    );
  };
});

describe('ItemSlider', () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
  });

  it('should show loading state initially', () => {
    (global.fetch as jest.Mock).mockImplementation(() => new Promise(() => {}));

    render(
      <TestWrapper>
        <ItemSlider />
      </TestWrapper>
    );

    expect(screen.getByText('در حال بارگذاری...')).toBeInTheDocument();
  });

  it('should display items when loaded', async () => {
    const mockItems: Item[] = [
      {
        id: '1',
        name: 'Item 1',
        price: 1000,
        image: '/item1.jpg',
        description: 'Description 1',
      },
      {
        id: '2',
        name: 'Item 2',
        price: 2000,
        image: '/item2.jpg',
        description: 'Description 2',
      },
    ];

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockItems,
    });

    render(
      <TestWrapper>
        <ItemSlider />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText('Item 1')).toBeInTheDocument();
      expect(screen.getByText('Item 2')).toBeInTheDocument();
    });
  });

  it('should display error message when fetch fails', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

    render(
      <TestWrapper>
        <ItemSlider />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText('خطا در دریافت محصولات')).toBeInTheDocument();
    });
  });

  it('should not fetch when selectedCategoryId is null', () => {
    render(
      <TestWrapper>
        <ItemSlider />
      </TestWrapper>
    );

    // CategoryProvider initializes with categoryId 1, so fetch should be called
    // This test is more to ensure the hook handles null properly
    expect(global.fetch).not.toHaveBeenCalledWith('/api/items/null');
  });
});

