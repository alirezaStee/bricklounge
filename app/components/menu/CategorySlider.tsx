'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { useEffect, useState } from 'react';
import { useCategoryContext } from '../../contexts/CategoryContext';
import CategoryItem from './CategoryItem';
import type { Category } from '../../types/item.types';

export default function CategorySlider() {
  const [categories, setCategories] = useState<Category[]>([]);
  const { selectedCategoryId, setSelectedCategoryId } = useCategoryContext();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div>
      <Swiper
        slidesPerView={4}
        className="w-full !pt-9"
        spaceBetween={8}
      >
        {categories.map((category) => (
          <SwiperSlide key={category.id} className="category-slide">
            <CategoryItem
              id={category.id}
              name={category.name}
              iconSrc={category.icon}
              isSelected={selectedCategoryId === category.id}
              onClick={() => setSelectedCategoryId(category.id)}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

