import { test, expect } from '../fixtures/inventory-fixtures';
import { LoginPage } from '../pages/login-page';

test.describe('Page Load and Initial State', () => {
  test.describe('1.1 Inventory Page Loads Successfully', () => {  
    test('@p0 Should display all 6 products on inventory page', async ({ inventoryPage }) => {
      await inventoryPage.expectInventoryItemsCount(6);
    });

    test('@p0 Should have Swag Labs header displayed', async ({ inventoryPage }) => {
      await inventoryPage.expectHeader();
    });

    test('@p0  Should have correct page title', async ({ inventoryPage }) => {
      await inventoryPage.expectPageTitle('Swag Labs');
    });

    test('@p0 Should display sorting dropdown', async ({ inventoryPage }) => {
      await inventoryPage.expectSortDropdownVisible();
    });

    test('@p0 Should display empty cart badge on initial load', async ({ inventoryPage }) => {
      await inventoryPage.expectEmptyCartBadge();
    });

    test('@p0 Should display Swag Labs logo', async ({ inventoryPage }) => {
      await inventoryPage.expectLogoVisible();
    });

    test('@p0 Should display all required products', async ({ inventoryPage }) => {
      const expectedProducts = [
        'Sauce Labs Backpack',
        'Sauce Labs Bike Light',
        'Sauce Labs Bolt T-Shirt',
        'Sauce Labs Fleece Jacket',
        'Sauce Labs Onesie',
        'Test.allTheThings() T-Shirt (Red)',
      ];
      await inventoryPage.expectAllProductsVisible(expectedProducts);
    });

    test('@p0 Should have menu button in header', async ({ inventoryPage }) => {
      await inventoryPage.expectMenuButtonVisible();
    });

    test('@p0 Should have cart button in header', async ({ inventoryPage }) => {
      await inventoryPage.expectCartButtonVisible();
    });

    test('@p0 Should load all product elements without errors', async ({ inventoryPage }) => {
      await inventoryPage.expectNoErrors();
    });

    test('@p0 Should display product images for all items', async ({ inventoryPage }) => {
      await inventoryPage.expectProductImagesVisible(6);
    });

    test('@p0 Should display product names for all items', async ({ inventoryPage }) => {
      await inventoryPage.expectProductNamesVisible(6);
    });

    test('@p0 Should display prices for all products', async ({ inventoryPage }) => {
      await inventoryPage.expectProductPricesVisible(6);
    });

    test('@p0 Should have Add to Cart buttons for all products', async ({ inventoryPage }) => {
      await inventoryPage.expectAddToCartButtonsVisible(6);
    });
  });

  test.describe('1.2 Page Redirects Non-Logged-In Users', () => {
    test('@p0 Should redirect to login page when accessing inventory without authentication', async ({ page }) => {
      const loginPage = new LoginPage(page);
      await page.goto('https://www.saucedemo.com/inventory.html');
      
      await expect(page).toHaveURL(/\/$|\/index.html$/);
      await loginPage.expectErrorMessage("Epic sadface: You can only access '/inventory.html' when you are logged in");
    });

    test('@p0 Should display specific error message for unauthenticated access', async ({ page }) => {
      const loginPage = new LoginPage(page);
      await page.goto('https://www.saucedemo.com/inventory.html');
      
      await loginPage.expectErrorMessage("Epic sadface: You can only access '/inventory.html' when you are logged in");
    });

    test('@p0 Should display login form after redirect', async ({ page }) => {
      const loginPage = new LoginPage(page);
      await page.goto('https://www.saucedemo.com/inventory.html');
      
      await loginPage.expectLoginPageStructure();
    });
  });
});