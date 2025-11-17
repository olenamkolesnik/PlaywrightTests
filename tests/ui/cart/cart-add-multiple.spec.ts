// spec: specs/inventory-page-test-plan-updated.md
// seed: tests/seed.spec.ts

import { test, expect } from '../../fixtures/inventory-fixtures';

test.describe('Add to Cart Functionality', () => {
  test('@p1 Add Multiple Products to Cart', async ({ inventoryPage }) => {
    const productsToAdd = [
      'Sauce Labs Onesie',
      'Sauce Labs Bike Light',
      'Test.allTheThings() T-Shirt (Red)',
    ];

    // 4.2: Click "Add to cart" for each product (business logic in test)
    for (const p of productsToAdd) {
      await inventoryPage.clickAddToCart(p);
    }

    // 4.2: Verify cart badge updates to show "3"
    const badgeCount = await inventoryPage.getCartBadgeCount();
    expect(badgeCount).toBe(3);

    // 4.2: Verify all three products show "Remove" button
    for (const p of productsToAdd) {
      await expect(inventoryPage.getRemoveButton(p)).toBeVisible();
    }

    // 4.2: Verify other products still show "Add to cart" button
    const otherProducts = [
      'Sauce Labs Backpack',
      'Sauce Labs Bolt T-Shirt',
      'Sauce Labs Fleece Jacket',
    ];
    for (const p of otherProducts) {
      await expect(inventoryPage.getAddToCartButton(p)).toBeVisible();
    }

    // 4.2: Verify no errors occurred
    await inventoryPage.expectNoErrors();
  });
});
