import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './base-page';
import { FooterComponent } from './footer-component';
import type { ProductData } from '../types/product';
import { EXPECTED_PRODUCTS } from '../data/products';

/**
 * Inventory Page Object Model
 * Handles all inventory page interactions and assertions
 * Extends BasePage for common functionality
 */
export class InventoryPage extends BasePage {
  private inventoryList: Locator;
  private inventoryItems: Locator;
  private secondaryHeader: Locator;
  private sortDropdown: Locator;
  private cartBadge: Locator;
  private logo: Locator;
  private menuButton: Locator;
  private cartButton: Locator;
  public footer: FooterComponent;

  constructor(page: Page) {
    super(page);
    this.inventoryList = page.locator('.inventory_list');
    this.inventoryItems = page.locator('[data-test="inventory-item"]');
    this.secondaryHeader = page.locator('.header_label');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.logo = page.locator('.app_logo');
    this.menuButton = page.locator('button[id="react-burger-menu-btn"]');
    this.cartButton = page.locator('[data-test="shopping-cart-link"]');
    this.footer = new FooterComponent(page);
  }

  async expectPageLoaded() {
    await expect(this.page).toHaveURL(/\/inventory.html$/, { timeout: 5000 });
    await expect(this.inventoryList).toBeVisible({ timeout: 5000 });
  }

  async expectInventoryItemsLoaded() {
    await expect(this.inventoryItems).not.toHaveCount(0);
  }

  async expectInventoryItemsCount(count: number) {
    await expect(this.inventoryItems).toHaveCount(count);
  }

  async expectHeader() {
    await expect(this.secondaryHeader).toContainText('Swag Labs');
  }

  async expectSortDropdownVisible() {
    await expect(this.sortDropdown).toBeVisible();
  }

  async expectEmptyCartBadge() {
    const badge = this.page.locator('[data-test="shopping-cart-badge"]');
    const isVisible = await badge.isVisible().catch(() => false);
    if (isVisible) {
      await expect(badge).toHaveText('0');
    }
  }

  async expectLogoVisible() {
    await expect(this.logo).toBeVisible();
  }

  async expectMenuButtonVisible() {
    await expect(this.menuButton).toBeVisible();
  }

  async expectCartButtonVisible() {
    await expect(this.cartButton).toBeVisible();
  }

  async expectProductVisible(productName: string) {
    const product = this.inventoryItems.filter({ hasText: productName });
    await expect(product).toBeVisible();
  }

  async expectAllProductsVisible(products: string[]) {
    for (const productName of products) {
      await this.expectProductVisible(productName);
    }
  }

  async expectNoErrors() {
    const errorMessages = await this.page.locator('[data-test="error"]').count();
    expect(errorMessages).toBe(0);
  }

  async expectPageTitle(title: string) {
    await expect(this.page).toHaveTitle(title);
  }

  async expectProductImagesVisible(count: number) {
    const images = this.page.locator('[data-test="inventory-item"] img');
    await expect(images).toHaveCount(count);
  }

  async expectProductNamesVisible(count: number) {
    const productNames = this.page.locator('.inventory_item_name');
    await expect(productNames).toHaveCount(count);
  }

  async expectProductPricesVisible(count: number) {
    const prices = this.page.locator('.inventory_item_price');
    await expect(prices).toHaveCount(count);
  }

  async expectAddToCartButtonsVisible(count: number) {
    const buttons = this.page.locator('[data-test*="add-to-cart"]');
    await expect(buttons).toHaveCount(count);
  }

  /**
   * Return the add-to-cart button locator for a specific product
   */
  getAddToCartButton(productName: string): Locator {
    return this.inventoryItems
      .filter({ hasText: productName })
      .locator('[data-test*="add-to-cart"]')
      .first();
  }

  /**
   * Return the remove-from-cart button locator for a specific product
   */
  getRemoveButton(productName: string): Locator {
    return this.inventoryItems
      .filter({ hasText: productName })
      .locator('[data-test*="remove"]')
      .first();
  }

  /**
   * Click the add-to-cart button for a product
   */
  async clickAddToCart(productName: string): Promise<void> {
    const btn = this.getAddToCartButton(productName);
    await expect(btn).toBeVisible({ timeout: 5000 });
    await btn.click();
  } 

  /**
   * Return the numeric cart badge count or null if not visible
   */
  async getCartBadgeCount(): Promise<number | null> {
    const isVisible = await this.cartBadge.isVisible().catch(() => false);
    if (!isVisible) return null;
    const text = (await this.cartBadge.textContent()) || '';
    const n = parseInt(text.trim(), 10);
    return Number.isNaN(n) ? null : n;
  }

  /**
   * Get product details by name
   */
  async getProductDetails(productName: string) {
    const product = this.inventoryItems.filter({ hasText: productName }).first();
    const name = await product.locator('.inventory_item_name').textContent();
    const price = await product.locator('.inventory_item_price').textContent();
    const image = await product.locator('img');
    const imageSrc = await image.getAttribute('src');
    const imageAlt = await image.getAttribute('alt');

    return { name, price, imageSrc, imageAlt };
  }

  /**
   * Get all products details
   */
  async getAllProductDetails() {
    const products = await this.inventoryItems.all();
    const details: Array<{ name: string | null; price: string | null; imageSrc: string | null; imageAlt: string | null; }> = [];

    for (const product of products) {
      const name = await product.locator('.inventory_item_name').textContent();
      const price = await product.locator('.inventory_item_price').textContent();
      const image = await product.locator('img');
      const imageSrc = await image.getAttribute('src');
      const imageAlt = await image.getAttribute('alt');

      details.push({ name, price, imageSrc, imageAlt });
    }

    return details;
  }

  /**
   * Expect product has correct name and price
   */
  async expectProductDetails(productName: string, expectedPrice: string) {
    const details = await this.getProductDetails(productName);
    
    expect(details.name?.trim()).toBe(productName);
    expect(details.price?.trim()).toBe(expectedPrice);
    expect(details.imageSrc).toBeTruthy();
    expect(details.imageAlt).toBeTruthy();
  }

  /**
   * Expect all products match expected data
   */
  async expectAllProductsDetails(expectedProducts: ProductData[]) {
    const actualDetails = await this.getAllProductDetails();

    expect(actualDetails).toHaveLength(expectedProducts.length);

    for (let i = 0; i < expectedProducts.length; i++) {
      const expected = expectedProducts[i];
      const actual = actualDetails[i];

      expect(actual.name?.trim()).toBe(expected.name);
      expect(actual.price?.trim()).toBe(expected.price);
      expect(actual.imageSrc).toBeTruthy();
      expect(actual.imageAlt).toBeTruthy();
    }
  }

  async expectInventoryPageFullyLoaded() {
    await this.expectPageLoaded();
    await this.expectInventoryItemsLoaded();
    await this.expectHeader();
  }

}
