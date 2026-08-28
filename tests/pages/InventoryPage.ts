import { Page, Locator } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly pageTitle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.locator('.title');
  }

  async goto(): Promise<void> {
    await this.page.goto('https://www.saucedemo.com/inventory.html');
  }

  async getPageTitle(): Promise<string> {
    return await this.pageTitle.innerText();
  }

  async getSessionUsernameFromStorage(): Promise<string | null> {
    return await this.page.evaluate(() => {
      return window.sessionStorage.getItem('session-username');
    });
  }
}