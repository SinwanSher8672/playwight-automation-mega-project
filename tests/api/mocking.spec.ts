import { test, expect } from '@playwright/test';

test.describe('Network Mocking Tests', () => {

  test('mock a successful API response with fake data', async ({ page }) => {
    await page.route('**/api/users/2', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          data: { id: 2, first_name: 'FakeName', email: 'fake@test.com' },
        }),
      });
    });

    const response = await page.request.get('https://reqres.in/api/users/2');
    const body = await response.json();

    expect(body.data.first_name).toBe('FakeName');
  });

  test('mock a server error (500) that never happens in real API', async ({ page }) => {
    await page.route('**/api/users/2', async (route) => {
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Internal Server Error' }),
      });
    });

    const response = await page.request.get('https://reqres.in/api/users/2');
    expect(response.status()).toBe(500);
  });

  test('mock an empty list response', async ({ page }) => {
    await page.route('**/api/users?page=2', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ data: [] }),
      });
    });

    const response = await page.request.get('https://reqres.in/api/users?page=2');
    const body = await response.json();

    expect(body.data.length).toBe(0);
  });

});