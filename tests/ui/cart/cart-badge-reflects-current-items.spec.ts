// spec: specs/inventory-page-test-plan-updated.md
// seed: tests/seed.spec.ts

import { test, expect } from '../../fixtures/inventory-fixtures';

test.describe('Cart Access and Navigation', () => {
  test('Cart Badge Reflects Current Items', async ({ inventoryPage, page }) => {
    // 1. Add 2 products to cart
    await inventoryPage.clickAddToCart('Sauce Labs Onesie');
    await inventoryPage.clickAddToCart('Sauce Labs Bike Light');

    // 2. Navigate away (open a product detail)
    await page.getByText('Sauce Labs Bike Light').click();
    await expect(page.getByText('Sauce Labs Bike Light')).toBeVisible();

    // 3. Return to inventory page
    await page.getByRole('button', { name: 'Back to products' }).click();
    await expect(page).toHaveURL(/\/inventory.html/);

    // 4. Observe cart badge shows '2'
    await expect(inventoryPage.getCartBadge()).toHaveText('2');
  });
});