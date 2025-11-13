import { test, expect } from '../fixtures/login-fixtures';

test('Login page loads correctly', async ({ loginPage }) => {
  await loginPage.expectLoginPageFullyLoaded();
});

test('Login with valid credentials', async ({ loginPage }) => {
  const inventoryPage = await loginPage.logIn('standard_user', 'secret_sauce');
  await inventoryPage.expectInventoryPageFullyLoaded();
});

test('Login with invalid credentials shows error', async ({ loginPage }) => {
  await loginPage.logIn('invalid_user', 'wrong_password');
  await loginPage.expectErrorMessage(
    'Epic sadface: Username and password do not match any user in this service'
  );
});

const invalidLoginData = [
  { username: '', password: '', error: 'Epic sadface: Username is required' },
  {
    username: '',
    password: 'doe',
    error: 'Epic sadface: Username is required',
  },
  {
    username: 'john',
    password: '',
    error: 'Epic sadface: Password is required',
  },
];

invalidLoginData.forEach(({ username, password, error }) => {
  test(`Login validation: username "${username}"/password "${password}" "${error}"`, async ({
    loginPage,
  }) => {
    if (username) await loginPage.fillUsername(username);
    if (password) await loginPage.fillPassword(password);
    await loginPage.clickLogin();
    await loginPage.expectErrorMessage(error);
  });
});
