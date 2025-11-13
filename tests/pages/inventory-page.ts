import { expect, type Locator, type Page } from '@playwright/test';

/**
 * Inventory Page Object Model
 * Handles all inventory page interactions and assertions
 */
export class InventoryPage {
  readonly page: Page;
  private inventoryList: Locator;
  private inventoryItems: Locator;
  private secondaryHeader: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inventoryList = page.locator('.inventory_list');
    this.inventoryItems = page.locator('[data-test="inventory-item"]');
    this.secondaryHeader = page.locator('.header_label');
  }

  async expectPageLoaded() {
    await expect(this.page).toHaveURL(/\/inventory.html$/, { timeout: 5000 });
    await expect(this.inventoryList).toBeVisible({ timeout: 5000 });
  }

  async expectInventoryItemsLoaded() {
    await expect(this.inventoryItems).not.toHaveCount(0);
  }

  async expectHeader() {
    await expect(this.secondaryHeader).toContainText('Swag Labs');
  }

  async expectInventoryPageFullyLoaded() {
    await this.expectPageLoaded();
    await this.expectInventoryItemsLoaded();
    await this.expectHeader();
  }
}
