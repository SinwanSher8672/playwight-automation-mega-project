import { test, expect } from '@playwright/test';
import { AlertsPage } from './pages/AlertsPage';

test.describe('JS Dialogs (Alert/Confirm/Prompt) Tests', () => {
  let alertsPage: AlertsPage;

  test.beforeEach(async ({ page }) => {
    alertsPage = new AlertsPage(page);
    await alertsPage.goto();
  });

  test('JS alert shows correct message and accept works', async () => {
    const message = await alertsPage.triggerAlertAndAccept();
    expect(message).toBe('I am a JS Alert');

    const resultText = await alertsPage.getResultText();
    expect(resultText).toContain('You successfully clicked an alert');
  });

  test('JS confirm - accept shows success result', async () => {
    await alertsPage.triggerConfirmAndAccept();
    const resultText = await alertsPage.getResultText();
    expect(resultText).toContain('You clicked: Ok');
  });

  test('JS confirm - dismiss shows cancel result', async () => {
    await alertsPage.triggerConfirmAndDismiss();
    const resultText = await alertsPage.getResultText();
    expect(resultText).toContain('You clicked: Cancel');
  });

  test('JS prompt - accept with text shows entered value', async () => {
    await alertsPage.triggerPromptAndAccept('Sinwan');
    const resultText = await alertsPage.getResultText();
    expect(resultText).toContain('You entered: Sinwan');
  });
});