import { test, expect } from '@playwright/test';
import { ApiHelper } from './pages/ApiHelper';

test.describe('Reqres API Tests', () => {
  let api: ApiHelper;

  test.beforeEach(async ({ request }) => {
    api = new ApiHelper(request);
  });

  test('GET - fetch a single user successfully', async () => {
    const response = await api.getUser(2);
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.data.id).toBe(2);
    expect(body.data.email).toContain('@reqres.in');
  });

  test('GET - fetch a non-existent user returns 404', async () => {
    const response = await api.getUser(999);
    expect(response.status()).toBe(404);
  });

  test('POST - create a new user', async () => {
    const response = await api.createUser('Sinwan', 'QA Engineer');
    expect(response.status()).toBe(201);

    const body = await response.json();
    expect(body.name).toBe('Sinwan');
    expect(body.job).toBe('QA Engineer');
    expect(body.id).toBeTruthy();
  });

  test('PUT - update an existing user', async () => {
    const response = await api.updateUser(2, 'Sinwan Updated', 'Senior QA');
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.name).toBe('Sinwan Updated');
  });

  test('DELETE - delete a user', async () => {
    const response = await api.deleteUser(2);
    expect(response.status()).toBe(204);
  });
});