'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { useState } from 'react';
import { useCategoryContext } from '../../contexts/CategoryContext';
import MenuItem from './MenuItem';
import ProductDetailModal from './ProductDetailModal';
import type { Item } from '../../types/item.types';
import { COLORS } from '../../lib/constants';
import { useItems } from '../../hooks/useItems';

export default function ItemSlider() {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const { selectedCategoryId } = useCategoryContext();
  const { data: items = [], isLoading, error } = useItems(selectedCategoryId);

  return (
    <div
      className="relative flex-1 overflow-hidden rounded-[250px_250px_0_0/90px_90px_0_0]"
      style={{ backgroundColor: COLORS.primaryDark }}
    >
      {isLoading && (
        <div className="flex items-center justify-center h-full text-white">
          در حال بارگذاری...
        </div>
      )}
      {error && (
        <div className="flex items-center justify-center h-full text-red-300">
          خطا در دریافت محصولات
        </div>
      )}
      {!isLoading && !error && (
        <>
          <Swiper
            key={selectedCategoryId}
            centeredSlides={true}
            modules={[Pagination]}
            className="w-full"
            pagination={{
              el: '.custom-pagination',
              clickable: true,
            }}
            breakpoints={{
              0: {
                slidesPerView: 1.5,
                spaceBetween: 8,
              },
              500: {
                slidesPerView: 2,
                spaceBetween: 16,
              },
            }}
          >
            {items.map((item) => (
              <SwiperSlide key={item.id} className="item-slide">
                <MenuItem
                  id={item.id}
                  name={item.name}
                  imageSrc={item.image}
                  price={item.price}
                  className="mt-10"
                  onClick={() => setSelectedItem(item)}
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="custom-pagination item-slide absolute bottom-2 flex w-full justify-center gap-4 pb-2.5 text-center"></div>
        </>
      )}
      {selectedItem && (
        <ProductDetailModal
          {...selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </div>
  );
}

