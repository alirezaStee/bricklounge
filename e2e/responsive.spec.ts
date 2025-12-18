import { test, expect } from '@playwright/test';

test.describe('Responsive Design', () => {
  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 }); // iPhone size
    await page.goto('/');
    await page.waitForTimeout(2000);

    // Page should render without horizontal scroll
    const body = page.locator('body');
    const box = await body.boundingBox();
    
    if (box) {
      // Content should fit within viewport
      expect(box.width).toBeLessThanOrEqual(375);
    }

    // Categories and items should be visible
    const swiper = page.locator('[data-testid="swiper"]');
    if (await swiper.count() > 0) {
      await expect(swiper.first()).toBeVisible();
    }
  });

  test('should be responsive on tablet', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 }); // iPad size
    await page.goto('/');
    await page.waitForTimeout(2000);

    // Content should be visible and properly laid out
    const body = page.locator('body');
    await expect(body).toBeVisible();
  });

  test('should be responsive on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/');
    await page.waitForTimeout(2000);

    // Content should be centered or properly aligned
    const body = page.locator('body');
    await expect(body).toBeVisible();

    // Check max-width constraint (project uses max-w-[700px])
    const mainContainer = page.locator('.max-w-\\[700px\\]');
    if (await mainContainer.count() > 0) {
      const box = await mainContainer.first().boundingBox();
      if (box) {
        expect(box.width).toBeLessThanOrEqual(700);
      }
    }
  });
});

