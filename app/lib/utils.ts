/**
 * Format number to Persian locale string
 */
export const formatPersianNumber = (num: number): string => {
  return num.toLocaleString('fa-IR');
};

/**
 * Format price with currency
 */
export const formatPrice = (price: number): string => {
  return `${formatPersianNumber(price)} تومان`;
};

