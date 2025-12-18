'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { useCategoryContext } from '../../contexts/CategoryContext';
import CategoryItem from './CategoryItem';
import { useCategories } from '../../hooks/useCategories';

export default function CategorySlider() {
  const { selectedCategoryId, setSelectedCategoryId } = useCategoryContext();
  const { data: categories = [], isLoading, error } = useCategories();

  if (isLoading) {
    return (
      <div className="w-full !pt-9 flex justify-center">
        <div>در حال بارگذاری...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full !pt-9 flex justify-center text-red-500">
        خطا در دریافت دسته‌بندی‌ها
      </div>
    );
  }

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

