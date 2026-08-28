import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';

test.use({ storageState: { cookies: [], origins: [] } });
// this line will override the stored login state and will treat this file as complete fresh 

test('valid login redirects to inventory page', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');

  await expect(page).toHaveURL(/inventory/);
});

test('invalid login shows error message', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login('wrong_user', 'wrong_password');

  await expect(loginPage.errorMessage).toBeVisible();
  await expect(loginPage.errorMessage).toContainText('Username and password do not match');
});