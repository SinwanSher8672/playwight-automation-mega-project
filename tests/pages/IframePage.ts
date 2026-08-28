import { Page, Locator, FrameLocator } from '@playwright/test';

export class IframePage {
  readonly page: Page;
  readonly firstFrame: FrameLocator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly innerFrame: FrameLocator;
  readonly emailInput: Locator;

  constructor(page: Page) {
    this.page = page;

    this.firstFrame = page.frameLocator('iframe[title="First Frame"]');
    this.firstNameInput = this.firstFrame.locator('[name="fname"]');
    this.lastNameInput = this.firstFrame.locator('[name="lname"]');

    this.innerFrame = this.firstFrame.frameLocator('iframe[title="Inner Frame"]');
    this.emailInput = this.innerFrame.locator('[name="email"]');
  }

  async goto(): Promise<void> {
    await this.page.goto('https://letcode.in/frame');
  }

  async fillFirstFrame(firstName: string, lastName: string): Promise<void> {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
  }

  async fillEmailInsideInnerFrame(email: string): Promise<void> {
    await this.emailInput.click();
    await this.emailInput.fill(email);
  }

  async getFirstNameValue(): Promise<string> {
    return await this.firstNameInput.inputValue();
  }

  async getEmailValue(): Promise<string> {
    return await this.emailInput.inputValue();
  }
}