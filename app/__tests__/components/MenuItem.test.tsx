import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MenuItem from '../../components/menu/MenuItem';

// Mock formatPrice
jest.mock('../../lib/utils', () => ({
  formatPrice: (price: number) => `${price} تومان`,
  formatPersianNumber: (num: number) => num.toString(),
}));

describe('MenuItem', () => {
  const defaultProps = {
    id: '1',
    name: 'Test Item',
    imageSrc: '/test-item.jpg',
    price: 1000,
  };

  it('should render item name and price', () => {
    render(<MenuItem {...defaultProps} />);
    expect(screen.getByText('Test Item')).toBeInTheDocument();
    expect(screen.getByText('1000 تومان')).toBeInTheDocument();
  });

  it('should call onClick when clicked', async () => {
    const handleClick = jest.fn();
    const user = userEvent.setup();

    render(<MenuItem {...defaultProps} onClick={handleClick} />);

    const button = screen.getByRole('button');
    await user.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should call onClick when Enter key is pressed', async () => {
    const handleClick = jest.fn();
    const user = userEvent.setup();

    render(<MenuItem {...defaultProps} onClick={handleClick} />);

    const button = screen.getByRole('button');
    button.focus();
    await user.keyboard('{Enter}');

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should render image with correct alt text', () => {
    render(<MenuItem {...defaultProps} />);
    const image = screen.getByAltText('Test Item');
    expect(image).toBeInTheDocument();
  });

  it('should apply custom className', () => {
    const { container } = render(<MenuItem {...defaultProps} className="custom-class" />);
    const item = container.querySelector('.custom-class');
    expect(item).toBeInTheDocument();
  });
});

