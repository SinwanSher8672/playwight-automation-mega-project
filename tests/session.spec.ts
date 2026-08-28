import { test, expect } from '@playwright/test';
import { InventoryPage } from './pages/InventoryPage';

test.describe('Session/Storage State Tests', () => {
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    inventoryPage = new InventoryPage(page);
    await inventoryPage.goto();
  });

  test('already logged in via storageState - no login needed', async () => {
    await expect(inventoryPage.pageTitle).toHaveText('Products');
  });

//   test('verify localStorage contains session token after login', async () => {
//     const sessionData = await inventoryPage.getSessionUsernameFromStorage();
//     expect(sessionData).toBe('standard_user');
//   });
});