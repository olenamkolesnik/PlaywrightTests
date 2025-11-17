import { test, expect } from '../../fixtures/inventory-fixtures';
import { CartPage } from '../../pages/cart-page';

test.describe('Cart Access and Navigation - Cart Contents', () => {
  test('@p1 5.2 Cart Badge Reflects Current Items and cart contains products', async ({ inventoryPage, page }) => {
    // Add two products
    await inventoryPage.clickAddToCart('Sauce Labs Onesie');
    await inventoryPage.clickAddToCart('Sauce Labs Bike Light');

    // Navigate to cart
    const cartPage = await inventoryPage.clickCart();
    await cartPage.expectOnCartPage();

    // Verify cart contains the two products
    await expect(cartPage.getCartItemCount()).resolves.toBe(2);
    await cartPage.expectProductInCart('Sauce Labs Onesie');
    await cartPage.expectProductInCart('Sauce Labs Bike Light');

    // Also verify header badge persists (optional)
    // go back and check badge
    await cartPage.clickContinueShopping();
    await expect(inventoryPage.getCartBadge()).toHaveText('2');
  });
});
