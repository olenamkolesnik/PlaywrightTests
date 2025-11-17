import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './base-page';

export class CartPage extends BasePage {
  private cartList: Locator;
  private cartItems: Locator;
  private continueShoppingButton: Locator;
  private checkoutButton: Locator;

  constructor(page: Page) {
    super(page);
    this.cartList = page.locator('.cart_list');
    this.cartItems = page.locator('.cart_item');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }

  async expectOnCartPage() {
    await expect(this.page).toHaveURL(/\/cart.html/);
    await expect(this.page.getByText('Your Cart')).toBeVisible();
    await expect(this.cartList).toBeVisible();
  }

  async getCartItemCount(): Promise<number> {
    return await this.cartItems.count();
  }

  async getCartItemNames(): Promise<string[]> {
    const items = await this.cartItems.all();
    const names: string[] = [];
    for (const item of items) {
      const name = await item.locator('.inventory_item_name').textContent();
      names.push(name?.trim() ?? '');
    }
    return names;
  }

  async expectProductInCart(productName: string) {
    const matching = this.cartItems.filter({ hasText: productName });
    await expect(matching).toBeVisible();
  }

  async clickContinueShopping() {
    await expect(this.continueShoppingButton).toBeVisible();
    await this.continueShoppingButton.click();
  }

  async clickCheckout() {
    await expect(this.checkoutButton).toBeVisible();
    await this.checkoutButton.click();
  }
}
