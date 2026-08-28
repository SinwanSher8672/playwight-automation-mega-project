import { Page, Locator } from '@playwright/test';

export class AlertsPage {
  readonly page: Page;
  readonly jsAlertButton: Locator;
  readonly jsConfirmButton: Locator;
  readonly jsPromptButton: Locator;
  readonly resultText: Locator;

  constructor(page: Page) {
    this.page = page;
    this.jsAlertButton = page.locator('button', { hasText: 'Click for JS Alert' });
    this.jsConfirmButton = page.locator('button', { hasText: 'Click for JS Confirm' });
    this.jsPromptButton = page.locator('button', { hasText: 'Click for JS Prompt' });
    this.resultText = page.locator('#result');
  }

  async goto(): Promise<void> {
    await this.page.goto('https://the-internet.herokuapp.com/javascript_alerts');
  }

  async triggerAlertAndAccept(): Promise<string> {
    let dialogMessage = '';
    this.page.once('dialog', async (dialog) => {
      dialogMessage = dialog.message();
      await dialog.accept();
    });
    await this.jsAlertButton.click();
    return dialogMessage;
  }

  async triggerConfirmAndAccept(): Promise<void> {
    this.page.once('dialog', async (dialog) => {
      await dialog.accept();
    });
    await this.jsConfirmButton.click();
  }

  async triggerConfirmAndDismiss(): Promise<void> {
    this.page.once('dialog', async (dialog) => {
      await dialog.dismiss();
    });
    await this.jsConfirmButton.click();
  }

  async triggerPromptAndAccept(text: string): Promise<void> {
    this.page.once('dialog', async (dialog) => {
      await dialog.accept(text);
    });
    await this.jsPromptButton.click();
  }

  async getResultText(): Promise<string> {
    return await this.resultText.innerText();
  }
}