import { test, expect } from '@playwright/test';

test.describe('Account API Endpoints', () => {
  test('GET /api/auth/session returns logged-in user profile', async ({ request }) => {
    // Make a GET request to the /api/auth/session endpoint
    const response = await request.get('/api/auth/session'); //

    // Assert that the response status is 200 OK
    expect(response.status()).toBe(200);

    // Assert that the response body contains the expected user profile information
    const body = await response.json();
    expect(body.user.email).toBe(process.env.TEST_USER_EMAIL);
    expect(body.user.name).toBe(process.env.TEST_USER_NAME);
  });
});
