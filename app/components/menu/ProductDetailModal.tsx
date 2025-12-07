import Image from 'next/image';
import { useCartContext } from '../../contexts/CartContext';
import type { Item } from '../../types/item.types';
import { formatPersianNumber, formatPrice } from '../../lib/utils';
import { IMAGE_PATHS, COLORS } from '../../lib/constants';

interface ProductDetailModalProps extends Item {
  onClose: () => void;
}

export default function ProductDetailModal({
  id,
  name,
  description,
  image,
  price,
  onClose,
}: ProductDetailModalProps) {
  const { getProductQty, increaseProductQty, decreaseProductQty } =
    useCartContext();

  const quantity = getProductQty(id);

  const handleIncrease = () => {
    increaseProductQty(id, price, name);
  };

  const handleDecrease = () => {
    decreaseProductQty(id);
  };

  return (
    <div
      className="z-9999 fixed inset-0 flex items-center justify-center bg-gray-950/50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-detail-title"
    >
      <div className="h-full w-full overflow-y-auto rounded-3xl bg-white p-5 animate-slide-up">
        <button
          className="cursor-pointer self-start"
          onClick={onClose}
          aria-label="بستن"
        >
          <Image
            src={IMAGE_PATHS.back}
            alt="بستن"
            width={34}
            height={29}
          />
        </button>

        <div
          className="mx-auto flex h-[245px] w-[245px] items-center justify-center overflow-hidden rounded-full shadow-lg"
          style={{ backgroundColor: COLORS.primary }}
        >
          <Image
            src={image}
            alt={name}
            width={245}
            height={245}
            className="object-contain"
            placeholder="blur"
            blurDataURL={IMAGE_PATHS.placeholder}
          />
        </div>

        <div className="mb-2.5 mt-4 flex w-full items-center justify-between">
          <span
            id="product-detail-title"
            className="text-[22px] font-bold"
            style={{ color: COLORS.text }}
          >
            {name}
          </span>
          <span
            className="text-lg font-semibold"
            style={{ color: '#2c875a' }}
          >
            {formatPrice(price)}
          </span>
        </div>

        {description && (
          <p
            className="mt-5 self-start text-base font-bold"
            style={{ color: COLORS.text }}
          >
            {description}
          </p>
        )}

        <div
          className="my-8 flex h-14 w-full items-center justify-between rounded-4xl px-4 py-7"
          style={{ backgroundColor: COLORS.primary }}
        >
          <p className="text-base font-bold text-white">یادداشت سفارش</p>
          <div className="flex items-center justify-center">
            <button
              onClick={handleIncrease}
              className="cursor-pointer"
              aria-label="افزایش تعداد"
            >
              <Image
                src={IMAGE_PATHS.plus}
                alt="افزایش"
                width={18}
                height={18}
              />
            </button>
            <span className="flex w-14 items-center justify-center text-xl text-white">
              {formatPersianNumber(quantity)}
            </span>
            <button
              onClick={handleDecrease}
              className="cursor-pointer"
              aria-label="کاهش تعداد"
            >
              <Image
                src={IMAGE_PATHS.minus}
                alt="کاهش"
                width={18}
                height={18}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

