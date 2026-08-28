import { test, expect } from '@playwright/test';
import { ApiHelper } from './pages/ApiHelper';

test.describe('API + UI Hybrid Pattern', () => {

  test('login via API and inject token into browser localStorage', async ({ page, request }) => {
    const api = new ApiHelper(request);

    // Step 1: API se login - milliseconds mein token mil jata hai
    const loginResponse = await api.login('eve.holt@reqres.in', 'cityslicka');
    expect(loginResponse.status()).toBe(200);

    const body = await loginResponse.json();
    const token = body.token;
    expect(token).toBeTruthy();

    // Step 2: Pehle ek baar page pe jao (taake origin set ho, localStorage available ho)
    await page.goto('https://reqres.in');

    // Step 3: Token ko browser ke localStorage mein daal do
    await page.evaluate((tokenValue) => {
      window.localStorage.setItem('auth-token', tokenValue);
    }, token);

    // Step 4: Verify karo token browser mein sahi se save hua
    const savedToken = await page.evaluate(() => {
      return window.localStorage.getItem('auth-token');
    });

    expect(savedToken).toBe(token);
  });

  test('login with invalid credentials fails properly', async ({ request }) => {
    const api = new ApiHelper(request);

    const response = await api.login('invalid@example.com', 'wrongpassword');
    expect(response.status()).toBe(400);

    const body = await response.json();
    expect(body.error).toBeTruthy();
  });

});