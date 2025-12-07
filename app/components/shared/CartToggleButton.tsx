'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useCartContext } from '../../contexts/CartContext';
import CartModal from '../cart/CartModal';
import { IMAGE_PATHS, COLORS } from '../../lib/constants';

export default function CartToggleButton() {
  const { cartItems } = useCartContext();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const hasItems = cartItems.length > 0;
  const menuIcon = hasItems ? IMAGE_PATHS.menuActive : IMAGE_PATHS.menu;

  return (
    <>
      <button
        className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full"
        style={{ backgroundColor: COLORS.primary }}
        onClick={() => setIsModalOpen(true)}
        aria-label="مشاهده سبد خرید"
      >
        <Image
          alt="منوی سفارش"
          src={menuIcon}
          width={35}
          height={35}
        />
      </button>
      {isModalOpen && (
        <CartModal onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
}

