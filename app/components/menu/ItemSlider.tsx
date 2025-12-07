'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { useEffect, useState } from 'react';
import { useCategoryContext } from '../../contexts/CategoryContext';
import MenuItem from './MenuItem';
import ProductDetailModal from './ProductDetailModal';
import type { Item } from '../../types/item.types';
import { COLORS } from '../../lib/constants';

export default function ItemSlider() {
  const [items, setItems] = useState<Item[]>([]);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const { selectedCategoryId } = useCategoryContext();

  useEffect(() => {
    if (!selectedCategoryId) return;

    const fetchItems = async () => {
      try {
        const response = await fetch(`/api/items/${selectedCategoryId}`);
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error('Failed to fetch items:', error);
      }
    };

    fetchItems();
  }, [selectedCategoryId]);

  return (
    <div
      className="relative flex-1 overflow-hidden rounded-[250px_250px_0_0/90px_90px_0_0]"
      style={{ backgroundColor: COLORS.primaryDark }}
    >
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
      {selectedItem && (
        <ProductDetailModal
          {...selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </div>
  );
}

