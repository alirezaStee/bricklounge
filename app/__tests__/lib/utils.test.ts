import { formatPersianNumber, formatPrice } from '../../lib/utils';

describe('utils', () => {
  describe('formatPersianNumber', () => {
    it('should format number to Persian locale', () => {
      expect(formatPersianNumber(1000)).toBe('۱٬۰۰۰');
      expect(formatPersianNumber(50000)).toBe('۵۰٬۰۰۰');
      expect(formatPersianNumber(0)).toBe('۰');
    });
  });

  describe('formatPrice', () => {
    it('should format price with currency', () => {
      expect(formatPrice(1000)).toBe('۱٬۰۰۰ تومان');
      expect(formatPrice(50000)).toBe('۵۰٬۰۰۰ تومان');
      expect(formatPrice(0)).toBe('۰ تومان');
    });
  });
});

