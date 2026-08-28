import { test, expect } from '@playwright/test';
import { TabsPage } from './pages/TabsPage';

test.describe('Multiple Tabs/Windows Tests', () => {
  let tabsPage: TabsPage;

  test.beforeEach(async ({ page }) => {
    tabsPage = new TabsPage(page);
    await tabsPage.goto();
  });

  test('clicking link opens a new tab with correct content', async () => {
    const newPage = await tabsPage.openNewTab();

    await expect(newPage).toHaveTitle('New Window');
    await expect(newPage.locator('h3')).toHaveText('New Window');
  });

  test('original tab remains unchanged after new tab opens', async ({ page }) => {
    await tabsPage.openNewTab();

    await expect(page).toHaveTitle('The Internet');
  });

  test('can interact with both tabs independently', async ({ page }) => {
    const newPage = await tabsPage.openNewTab();

    await expect(page.locator('h3')).toHaveText('Opening a new window');
    await expect(newPage.locator('h3')).toHaveText('New Window');
  });
});