import { test, expect } from '@playwright/test';
import { IframePage } from './pages/IframePage';

test.describe('LetCode Multi-iFrame Form Tests', () => {
  let iframePage: IframePage;

  test.beforeEach(async ({ page }) => {
    iframePage = new IframePage(page);
    await iframePage.goto();
  });

  test('can fill first name and last name inside the first iframe', async () => {
    await iframePage.fillFirstFrame('Sinwan', 'Sher');

    const firstName = await iframePage.getFirstNameValue();
    expect(firstName).toBe('Sinwan');
  });

  test('can fill email inside the second (inner) iframe', async () => {
    await iframePage.fillEmailInsideInnerFrame('sinwan@example.com');

    const email = await iframePage.getEmailValue();
    expect(email).toBe('sinwan@example.com');
  });

  test('both iframes work independently in the same test', async () => {
    await iframePage.fillFirstFrame('Ali', 'Khan');
    await iframePage.fillEmailInsideInnerFrame('ali.khan@example.com');

    const firstName = await iframePage.getFirstNameValue();
    const email = await iframePage.getEmailValue();

    expect(firstName).toBe('Ali');
    expect(email).toBe('ali.khan@example.com');
  });

  test('first name field is empty by default', async () => {
    const firstName = await iframePage.getFirstNameValue();
    expect(firstName).toBe('');
  });

  test('email field is editable', async () => {
    const isEditable = await iframePage.emailInput.isEditable();
    expect(isEditable).toBeTruthy();
  });
});