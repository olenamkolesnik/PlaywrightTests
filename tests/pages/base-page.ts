import { expect, type Locator, type Page } from '@playwright/test';

/**
 * Base Page Object Model
 * Contains common functionality shared across all pages
 * Follows Single Responsibility Principle (SRP)
 */
export abstract class BasePage {
  public readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Expect page title to match
   */
  async expectPageTitle(title: string) {
    await expect(this.page).toHaveTitle(title);
  }

  /**
   * Navigate to specific path
   */
  async navigateTo(path: string) {
    await this.page.goto(path);
  }
}
