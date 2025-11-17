import { test, expect } from '../../fixtures/inventory-fixtures';
import { CartPage } from '../../pages/cart-page';

test.describe('Cart Access and Navigation - Cart', () => {
  test('@p0 5.1 Navigate to Cart from Inventory Page', async ({ inventoryPage, page }) => {
    // Add single product
    await inventoryPage.clickAddToCart('Sauce Labs Backpack');

    // Verify cart badge shows 1
    await expect(inventoryPage.getCartBadge()).toHaveText('1');

    // Click cart and verify cart page
    const cartPage = await inventoryPage.clickCart();
    await cartPage.expectOnCartPage();
    await cartPage.expectProductInCart('Sauce Labs Backpack');
  });
});
