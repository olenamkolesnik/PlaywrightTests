// spec: specs/inventory-page-test-plan-updated.md
// seed: tests/seed.spec.ts

import { test, expect } from '../../fixtures/inventory-fixtures';

test.describe('Add to Cart Functionality', () => {
  test('@p0 Cart Badge Updates Correctly', async ({ inventoryPage }) => {
    const productsToAdd = [
      'Sauce Labs Backpack',
      'Sauce Labs Bike Light',
      'Sauce Labs Bolt T-Shirt',
      'Sauce Labs Fleece Jacket',
      'Sauce Labs Onesie',
    ];

    // 4.3: Add 5 different products to cart one by one
    for (let i = 0; i < productsToAdd.length; i++) {
      const productName = productsToAdd[i];
      const expectedCount = i + 1;

      // 4.3: Add product (business logic in test)
      await inventoryPage.clickAddToCart(productName);

      // 4.3: Verify cart badge increments correctly
      const badgeCount = await inventoryPage.getCartBadgeCount();
      expect(badgeCount).toBe(expectedCount);

      // 4.3: Verify badge is always visible in the header
      expect(badgeCount).not.toBeNull();
    }

    // 4.3: Verify final state - badge shows "5"
    const finalCount = await inventoryPage.getCartBadgeCount();
    expect(finalCount).toBe(5);

    // 4.3: Verify no errors occurred
    await inventoryPage.expectNoErrors();
  });
});
