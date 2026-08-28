import { Page, Locator, BrowserContext } from '@playwright/test';

export class TabsPage {
  readonly page: Page;
  readonly context: BrowserContext;
  readonly openTabLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.context = page.context();
    this.openTabLink = page.locator('#content a', { hasText: 'Click Here' });
  }

  async goto(): Promise<void> {
    await this.page.goto('https://the-internet.herokuapp.com/windows');
  }

  async openNewTab(): Promise<Page> {
    const [newPage] = await Promise.all([
      this.context.waitForEvent('page'),
      this.openTabLink.click(),
    ]);
    await newPage.waitForLoadState();
    return newPage;
  }
}