import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './base-page';
import { InventoryPage } from './inventory-page';

/**
 * Login Page Object Model
 * Handles all login page interactions and assertions
 * Extends BasePage for common functionality
 */
export class LoginPage extends BasePage {
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  private readonly errorMessage: Locator;
  private readonly rootLocator: Locator;
  private readonly loginContainer: Locator;
  private readonly credentialsContainer: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.errorMessage = page.locator('[data-test="error"]');
    this.rootLocator = page.locator('#root');
    this.loginContainer = page.locator('[data-test="login-container"]');
    this.credentialsContainer = page.locator('[data-test="login-credentials-container"]');
  }

  async goto() {
    await this.page.goto('/');
    await expect(this.usernameInput).toBeVisible({ timeout: 5000 });
  }

  async fillUsername(username: string) {
    await this.usernameInput.fill(username);
  }

  async fillPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  async clickLogin() {
    await this.loginButton.click();
  }

  async logIn(username: string, password: string): Promise<InventoryPage> {
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.clickLogin();
    await this.page.waitForLoadState('load');
    return new InventoryPage(this.page);
  }

  async expectErrorMessage(message: string) {
    await expect(this.errorMessage).toBeVisible({ timeout: 5000 });
    await expect(this.errorMessage).toContainText(message);
  }

  async expectPageHeading(text: string) {
    await expect(this.rootLocator).toContainText(text);
  }

  async expectLoginPageStructure() {
    await expect(this.loginContainer)
      .toMatchAriaSnapshot(`
    - textbox "Username"
    - textbox "Password"
    - button "Login"
    `);
    await expect(this.credentialsContainer)
      .toMatchAriaSnapshot(`
    - heading "Accepted usernames are:" [level=4]
    - text: standard_user locked_out_user problem_user performance_glitch_user error_user visual_user
    - heading "Password for all users:" [level=4]
    - text: secret_sauce
    `);
  }

  async expectLoginPageFullyLoaded() {
    await this.expectPageTitle('Swag Labs');
    await this.expectPageHeading('Swag Labs');
    await this.expectLoginPageStructure();
  }  
}