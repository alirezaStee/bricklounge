import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CategoryItem from '../../components/menu/CategoryItem';

describe('CategoryItem', () => {
  const defaultProps = {
    id: 1,
    name: 'Test Category',
    iconSrc: '/test-icon.svg',
  };

  it('should render category name', () => {
    render(<CategoryItem {...defaultProps} />);
    expect(screen.getByText('Test Category')).toBeInTheDocument();
  });

  it('should call onClick when clicked', async () => {
    const handleClick = jest.fn();
    const user = userEvent.setup();

    render(<CategoryItem {...defaultProps} onClick={handleClick} />);

    const button = screen.getByRole('button');
    await user.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should call onClick when Enter key is pressed', async () => {
    const handleClick = jest.fn();
    const user = userEvent.setup();

    render(<CategoryItem {...defaultProps} onClick={handleClick} />);

    const button = screen.getByRole('button');
    button.focus();
    await user.keyboard('{Enter}');

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should call onClick when Space key is pressed', async () => {
    const handleClick = jest.fn();
    const user = userEvent.setup();

    render(<CategoryItem {...defaultProps} onClick={handleClick} />);

    const button = screen.getByRole('button');
    button.focus();
    await user.keyboard(' ');

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should apply selected border class when isSelected is true', () => {
    const { container } = render(<CategoryItem {...defaultProps} isSelected />);
    const imageContainer = container.querySelector('.border-3');
    expect(imageContainer).toBeInTheDocument();
  });

  it('should not apply selected border class when isSelected is false', () => {
    const { container } = render(<CategoryItem {...defaultProps} isSelected={false} />);
    const imageContainer = container.querySelector('.border-3');
    expect(imageContainer).not.toBeInTheDocument();
  });

  it('should render image with correct alt text', () => {
    render(<CategoryItem {...defaultProps} />);
    const image = screen.getByAltText('Test Category icon');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/test-icon.svg');
  });
});

