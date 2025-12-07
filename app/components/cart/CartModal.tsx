import Image from 'next/image';
import { useCartContext } from '../../contexts/CartContext';
import CartItemRow from './CartItemRow';
import { IMAGE_PATHS, COLORS } from '../../lib/constants';

interface CartModalProps {
  onClose: () => void;
}

export default function CartModal({ onClose }: CartModalProps) {
  const { cartItems } = useCartContext();

  const isEmpty = cartItems.length === 0;

  return (
    <div
      className="z-9999 fixed inset-0 flex animate-fade-in items-center justify-center bg-black"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-modal-title"
    >
      <div className="flex h-full w-full max-w-[700px] flex-col items-center overflow-y-auto bg-white">
        <header
          className="relative flex h-20 w-full items-center justify-center"
          style={{ backgroundColor: COLORS.primary }}
        >
          <p id="cart-modal-title" className="text-base font-bold text-white">
            سفارش های شما
          </p>
          <button
            className="absolute right-2 cursor-pointer"
            onClick={onClose}
            aria-label="بستن"
          >
            <Image
              alt="بستن"
              src={IMAGE_PATHS.backWhite}
              width={65}
              height={65}
            />
          </button>
        </header>

        <main className="w-full px-4 py-8 md:px-8">
          {isEmpty ? (
            <p
              className="my-10 text-center text-base font-bold"
              style={{ color: COLORS.textSecondary }}
            >
              هنوز غذایی به لیست سفارش اضافه نشده است.
            </p>
          ) : (
            <div>
              <div
                className="flex border-b-2 pb-1 text-center text-base font-bold"
                style={{ borderColor: COLORS.textSecondary, color: COLORS.text }}
              >
                <span className="w-1/2">غذا</span>
                <span className="w-1/4">نوع</span>
                <span className="w-1/4">تعداد</span>
              </div>
              <div>
                {cartItems.map((cartItem, index) => (
                  <CartItemRow
                    key={cartItem.id}
                    index={index}
                    {...cartItem}
                  />
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

