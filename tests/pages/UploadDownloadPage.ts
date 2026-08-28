import { Page, Locator, Download } from '@playwright/test';

export class UploadDownloadPage {
  readonly page: Page;
  readonly fileInput: Locator;
  readonly uploadButton: Locator;
  readonly uploadedFileName: Locator;

  constructor(page: Page) {
    this.page = page;
    this.fileInput = page.locator('#file-upload');
    this.uploadButton = page.locator('#file-submit');
    this.uploadedFileName = page.locator('#uploaded-files');
  }

  async gotoUploadPage(): Promise<void> {
    await this.page.goto('https://the-internet.herokuapp.com/upload');
  }

  async gotoDownloadPage(): Promise<void> {
    await this.page.goto('https://the-internet.herokuapp.com/download');
  }

  async uploadFile(filePath: string): Promise<void> {
    await this.fileInput.setInputFiles(filePath);
    await this.uploadButton.click();
  }

  async getUploadedFileName(): Promise<string> {
    return await this.uploadedFileName.innerText();
  }

  async downloadFileByName(fileName: string): Promise<Download> {
    const downloadLink = this.page.locator('a', { hasText: fileName });
    const [download] = await Promise.all([
      this.page.waitForEvent('download'),
      downloadLink.click(),
    ]);
    return download;
  }
}