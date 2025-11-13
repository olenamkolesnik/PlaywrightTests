import { expect, type Locator, type Page } from '@playwright/test';
import { InventoryPage } from './inventory-page';

/**
 * Login Page Object Model
 * Handles all login page interactions and assertions
 */
export class LoginPage {
  readonly page: Page;
  private usernameInput: Locator;
  private passwordInput: Locator;
  private loginButton: Locator;
  private errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  async goto() {
    await this.page.goto('/');
    // Wait for login form to be ready
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
    return new InventoryPage(this.page);
  }

  async expectErrorMessage(message: string) {
    await expect(this.errorMessage).toBeVisible({ timeout: 5000 });
    await expect(this.errorMessage).toHaveText(message);
  }

  async expectPageTitle(title: string) {
    await expect(this.page).toHaveTitle(title);
  }

  async expectPageHeading(text: string) {
    await expect(this.page.locator('#root')).toContainText(text);
  }

  async expectLoginPageStructure() {
    await expect(this.page.locator('[data-test="login-container"]'))
      .toMatchAriaSnapshot(`
    - textbox "Username"
    - textbox "Password"
    - button "Login"
    `);
    await expect(this.page.locator('[data-test="login-credentials-container"]'))
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
