// spec: specs/inventory-page-test-plan-updated.md
// seed: tests/seed.spec.ts

import { test, expect } from '../../fixtures/inventory-fixtures';
import { EXPECTED_PRODUCTS } from '../../data/products';

test.describe('Add to Cart Functionality', () => {
  test('@p0 Add Single Product to Cart', async ({ inventoryPage }) => {
    // 4.1: Locate "Sauce Labs Backpack" product
    const productName = 'Sauce Labs Backpack';
    await inventoryPage.expectProductVisible(productName);

    // 4.1: Click "Add to cart" button for this product
    await inventoryPage.clickAddToCart(productName);

    // 4.1: Verify cart badge appears and shows "1"
    const badgeCount = await inventoryPage.getCartBadgeCount();
    expect(badgeCount).toBe(1);

    // 4.1: Verify "Add to cart" button changed to "Remove" button
    await expect(inventoryPage.getRemoveButton(productName)).toBeVisible();

    // 4.1: Verify product remains visible on page
    await inventoryPage.expectProductVisible(productName);

    // 4.1: Verify no errors occurred
    await inventoryPage.expectNoErrors();
  });
});
