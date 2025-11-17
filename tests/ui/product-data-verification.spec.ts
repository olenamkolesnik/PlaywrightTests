import { test } from '../fixtures/inventory-fixtures';
import { EXPECTED_PRODUCTS } from '../data/products';

test.describe('Product Data Verification', () => {
  test.describe('1.3 Product Details (Representative Sample - P1)', () => {
    test('@p1 Should display correct details for Backpack product', async ({ inventoryPage }) => {
      await inventoryPage.expectProductDetails('Sauce Labs Backpack', '$29.99');
    });   
  });

  test.describe('1.4 All Products Details (Comprehensive - P2)', () => {
    test('@p2 Should display correct details for all products', async ({ inventoryPage }) => {
      await inventoryPage.expectAllProductsDetails(EXPECTED_PRODUCTS);
    });
  });
});
