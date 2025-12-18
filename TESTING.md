# راهنمای تست‌های پروژه

این پروژه شامل تست‌های Unit و E2E (End-to-End) است.

## تست‌های Unit

تست‌های Unit با Jest و React Testing Library نوشته شده‌اند.

### اجرای تست‌های Unit

```bash
# اجرای تمام تست‌ها
npm run test

# اجرای تست‌ها در حالت watch
npm run test:watch

# اجرای تست‌ها با گزارش coverage
npm run test:coverage
```

### ساختار تست‌های Unit

```
app/__tests__/
├── api/              # تست‌های API routes
├── components/       # تست‌های کامپوننت‌ها
├── contexts/         # تست‌های Context‌ها
├── hooks/           # تست‌های Custom Hooks
├── lib/             # تست‌های Utility Functions
└── test-utils.tsx   # Helper functions برای تست‌ها
```

### تست‌های نوشته شده

#### Hooks
- ✅ `useCategories` - تست دریافت دسته‌بندی‌ها
- ✅ `useItems` - تست دریافت آیتم‌ها

#### Contexts
- ✅ `CategoryContext` - تست مدیریت state دسته‌بندی انتخابی
- ✅ `CartContext` - تست مدیریت سبد خرید

#### Components
- ✅ `CategoryItem` - تست نمایش و تعامل با آیتم دسته‌بندی
- ✅ `MenuItem` - تست نمایش و تعامل با آیتم منو
- ✅ `CategorySlider` - تست نمایش و بارگذاری دسته‌بندی‌ها
- ✅ `ItemSlider` - تست نمایش و بارگذاری آیتم‌ها

#### API Routes
- ✅ `/api/categories` - تست API دسته‌بندی‌ها
- ✅ `/api/items/[id]` - تست API آیتم‌ها

#### Utils
- ✅ `formatPrice` - تست فرمت کردن قیمت
- ✅ `formatPersianNumber` - تست فرمت کردن اعداد فارسی

## تست‌های E2E

تست‌های E2E با Playwright نوشته شده‌اند.

### اجرای تست‌های E2E

```bash
# اجرای تمام تست‌های E2E
npm run test:e2e

# اجرای تست‌ها با UI mode
npm run test:e2e:ui

# اجرای تست‌ها در حالت headed (نمایش مرورگر)
npm run test:e2e:headed
```

### ساختار تست‌های E2E

```
e2e/
├── home.spec.ts              # تست صفحه اصلی
├── category-selection.spec.ts # تست انتخاب دسته‌بندی
├── item-interaction.spec.ts   # تست تعامل با آیتم‌ها
├── cart-flow.spec.ts          # تست جریان سبد خرید
└── responsive.spec.ts         # تست طراحی responsive
```

### تست‌های نوشته شده

- ✅ **Home Page** - تست بارگذاری صفحه اصلی و نمایش محتوا
- ✅ **Category Selection** - تست تغییر دسته‌بندی و نمایش آیتم‌ها
- ✅ **Item Interaction** - تست کلیک روی آیتم‌ها و نمایش جزئیات
- ✅ **Cart Flow** - تست افزودن به سبد خرید
- ✅ **Responsive Design** - تست نمایش صحیح در اندازه‌های مختلف صفحه

### اجرای تمام تست‌ها

```bash
npm run test:all
```

این دستور هم تست‌های Unit و هم E2E را اجرا می‌کند.

## نکات مهم

1. قبل از اجرای تست‌های E2E، مطمئن شوید که سرور توسعه در حال اجرا است:
   ```bash
   npm run dev
   ```

2. تست‌های E2E به صورت خودکار سرور را راه‌اندازی می‌کنند، اما اگر مشکلی پیش آمد، می‌توانید به صورت دستی سرور را اجرا کنید.

3. برای تست‌های Unit، تمام dependencies باید mock شده باشند تا تست‌ها مستقل باشند.

4. Coverage گزارش می‌تواند در فایل `coverage/` مشاهده شود.

## Troubleshooting

### مشکل در تست‌های React Query

اگر تست‌های مربوط به React Query با خطا مواجه شدند، مطمئن شوید که کامپوننت‌ها در داخل `QueryClientProvider` قرار دارند.

### مشکل در تست‌های E2E

اگر تست‌های E2E با خطا مواجه شدند:
1. مطمئن شوید که Playwright browsers نصب شده‌اند: `npx playwright install`
2. مطمئن شوید که سرور در حال اجرا است
3. بررسی کنید که پورت 3000 آزاد است

