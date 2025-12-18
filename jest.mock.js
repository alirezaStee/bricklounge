// Mock for Swiper modules
const React = require('react');

module.exports = {
  Swiper: ({ children, ...props }) => React.createElement('div', { 'data-testid': 'swiper', ...props }, children),
  SwiperSlide: ({ children, ...props }) => React.createElement('div', { 'data-testid': 'swiper-slide', ...props }, children),
  Pagination: () => null,
};

