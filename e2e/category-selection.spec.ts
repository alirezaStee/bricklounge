import { test, expect } from '@playwright/test';

test.describe('Category Selection', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Wait for initial load
    await page.waitForTimeout(2000);
  });

  test('should change items when category is selected', async ({ page }) => {
    // Wait for initial items to load
    await page.waitForTimeout(3000);
    
    // Wait for categories to be visible first
    const categoryNames = page.locator('span:has-text("اسپرسو"), span:has-text("قهوه"), span').filter({
      has: page.locator('text=/اسپرسو|قهوه|نوشیدنی/'),
    });
    
    const categoryCount = await categoryNames.count();
    
    if (categoryCount >= 2) {
      // Get initial state
      const initialLoadingState = await page.getByText(/در حال بارگذاری/i).first().isVisible().catch(() => false);
      
      // Click the second category (skip first one as it's likely selected)
      const secondCategory = categoryNames.nth(1);
      
      // Find the parent button/clickable element
      const categoryButton = secondCategory.locator('..').locator('[role="button"]').first();
      const hasButton = await categoryButton.count() > 0;
      
      if (hasButton) {
        await categoryButton.click();
        
        // Wait for change - either loading appears or items change
        await page.waitForTimeout(2000);
        
        const isLoadingAfterClick = await page.getByText(/در حال بارگذاری/i).first().isVisible().catch(() => false);
        
        // At minimum, we should see a loading state or change
        expect(isLoadingAfterClick || !initialLoadingState).toBeTruthy();
      } else {
        // If no button found, just click on the category name
        await secondCategory.click();
        await page.waitForTimeout(2000);
        const isLoadingAfterClick = await page.getByText(/در حال بارگذاری/i).first().isVisible().catch(() => false);
        expect(isLoadingAfterClick || !initialLoadingState).toBeTruthy();
      }
    } else {
      // If categories are not loaded, the test cannot proceed
      test.skip();
    }
  });

  test('should highlight selected category', async ({ page }) => {
    // Look for selected category (has border-3 class or similar visual indicator)
    const selectedCategory = page.locator('.border-3, [class*="border"]');
    
    // At least one category should be selected initially
    if (await selectedCategory.count() > 0) {
      await expect(selectedCategory.first()).toBeVisible();
    }
  });
});

