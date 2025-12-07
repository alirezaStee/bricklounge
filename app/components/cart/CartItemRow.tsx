import Image from 'next/image';
import { useCartContext } from '../../contexts/CartContext';
import { formatPersianNumber, formatPrice } from '../../lib/utils';
import { IMAGE_PATHS, COLORS } from '../../lib/constants';

interface CartItemRowProps {
  id: string;
  index: number;
  name: string;
  price: number;
  qty: number;
}

export default function CartItemRow({
  id,
  index,
  name,
  price,
  qty,
}: CartItemRowProps) {
  const {
    increaseProductQty,
    decreaseProductQty,
    deleteProduct,
    getProductTotal,
  } = useCartContext();

  const handleIncrease = () => {
    increaseProductQty(id, price, name);
  };

  const handleDecrease = () => {
    decreaseProductQty(id);
  };

  const handleDelete = () => {
    deleteProduct(id);
  };

  return (
    <div className="border-b last:border-0">
      <div className="flex py-3">
        <p className="flex w-1/2 text-sm font-bold" style={{ color: COLORS.text }}>
          <span className="ml-4">{formatPersianNumber(index + 1)}</span>
          <span>{name}</span>
        </p>
        <p className="w-1/4 text-center">-</p>
        <div className="flex w-1/4 items-center justify-center gap-4 text-center">
          <button
            className="cursor-pointer"
            onClick={handleIncrease}
            aria-label="افزایش تعداد"
          >
            <Image
              src={IMAGE_PATHS.increase}
              alt="افزایش"
              height={25}
              width={25}
            />
          </button>
          <p>{formatPersianNumber(qty)}</p>
          <button
            className="cursor-pointer"
            onClick={handleDecrease}
            aria-label="کاهش تعداد"
          >
            <Image
              src={IMAGE_PATHS.decrease}
              alt="کاهش"
              height={25}
              width={25}
            />
          </button>
        </div>
      </div>
      <div className="flex min-h-12 w-full items-center justify-items-start gap-10">
        <span
          className="min-w-1/2 rounded-full px-0.5 py-1 text-center text-base font-bold"
          style={{ backgroundColor: COLORS.background, color: COLORS.text }}
        >
          مبلغ: {formatPrice(getProductTotal(id))}
        </span>
        <button
          className="cursor-pointer"
          onClick={handleDelete}
          aria-label="حذف محصول"
        >
          <Image
            src={IMAGE_PATHS.delete}
            alt="حذف"
            width={25}
            height={25}
          />
        </button>
      </div>
    </div>
  );
}

