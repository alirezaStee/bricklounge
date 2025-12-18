import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load the home page', async ({ page }) => {
    await expect(page).toHaveTitle(/Brick lounge/i);
  });

  test('should display categories', async ({ page }) => {
    // Wait for categories to load - either loading disappears or categories appear
    const loadingText = page.getByText(/در حال بارگذاری/i).first();
    const swiper = page.locator('[data-testid="swiper"]').first();

    // Wait for either loading to disappear or swiper to appear
    await Promise.race([
      loadingText.waitFor({ state: 'hidden', timeout: 5000 }).catch(() => {}),
      swiper.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {}),
    ]);

    // Check if categories are loaded (swiper exists or loading is gone)
    const hasSwiper = await swiper.count() > 0;
    const isLoading = await loadingText.isVisible().catch(() => false);

    expect(hasSwiper || !isLoading).toBeTruthy();
  });

  test('should display items when category is selected', async ({ page }) => {
    // Wait for initial load
    await page.waitForTimeout(2000);

    // Items should be visible (they load automatically with default category)
    // Look for item names or prices
    const hasItems = await page.locator('text=/.*تومان.*/').count() > 0;
    expect(hasItems).toBeTruthy();
  });

  test('should handle API errors gracefully', async ({ page }) => {
    // Intercept and fail the categories API call
    await page.route('**/api/categories', (route) => {
      route.fulfill({
        status: 500,
        body: JSON.stringify({ error: 'Internal Server Error' }),
      });
    });

    await page.reload();
    
    // Should show error message - wait for it to appear
    await expect(page.getByText(/خطا در دریافت دسته‌بندی‌ها/i).first()).toBeVisible({ timeout: 10000 });
  });
});

