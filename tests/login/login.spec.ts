import { test, expect } from '@playwright/test';
import { LoginPage } from './login-page';

test.describe('Login Page Tests', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('Login page loads correctly', async ({ page }) => {
    await expect(page).toHaveTitle('Swag Labs');
    await expect(page.locator('#root')).toContainText('Swag Labs');
    await expect(page.locator('[data-test="login-container"]'))
      .toMatchAriaSnapshot(`
    - textbox "Username"
    - textbox "Password"
    - button "Login"
    `);
    await expect(page.locator('[data-test="login-credentials-container"]'))
      .toMatchAriaSnapshot(`
    - heading "Accepted usernames are:" [level=4]
    - text: standard_user locked_out_user problem_user performance_glitch_user error_user visual_user
    - heading "Password for all users:" [level=4]
    - text: secret_sauce
    `);
  });

  test('Login with valid credentials', async ({ page }) => {
    await loginPage.logIn('standard_user', 'secret_sauce');

    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    await expect(page.locator('.inventory_list')).toBeVisible();    
    await expect(page.locator('[data-test="inventory-item"]')).not.toHaveCount(0); 
  });

  test('Login with invalid credentials shows error', async ({ page }) => {
    await loginPage.logIn('invalid_user', 'wrong_password');
    await loginPage.expectErrorMessage(
      'Epic sadface: Username and password do not match any user in this service'
    );
  });

  const invalidLoginData = [
    { username: '', password: '', error: 'Epic sadface: Username is required' },
    { username: '', password: 'doe', error: 'Epic sadface: Username is required' },
    { username: 'john', password: '', error: 'Epic sadface: Password is required' },
  ];

    invalidLoginData.forEach(({ username, password, error }) => {
    test(`Login validation: username "${username}"/password "${password}" "${error}"`, async ({
      page,
    }) => {
      if (username) await loginPage.fillUsername(username);
      if (password) await loginPage.fillPassword(password);
      await loginPage.clickLogin();
      await loginPage.expectErrorMessage(error);
    });
  });
});
