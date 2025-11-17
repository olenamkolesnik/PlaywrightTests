import { defineConfig, test as base } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { InventoryPage } from '../pages/inventory-page';
import { testCredentials } from '../helpers/test-credentials';

type TestFixtures = {
  inventoryPage: InventoryPage;
};

export const test = base.extend<TestFixtures>({
  inventoryPage: async ({ page }, use) => {
    // Login first before providing inventory page
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    const inventoryPage = await loginPage.logIn(
      testCredentials.validUser.username!,
      testCredentials.validUser.password!
    );
    await inventoryPage.expectInventoryPageFullyLoaded();
    await use(inventoryPage);
  },
});

export { expect } from '@playwright/test';
