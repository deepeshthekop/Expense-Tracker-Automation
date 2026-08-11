import { test, expect } from '../../fixtures/page-fixtures';

// Clear cookies and local storage before each test to ensure a clean state
test.use({ storageState: { cookies: [], origins: [] } });

test.describe('Login Functionality', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigateToLogin();
  });

  test('User can log in', async ({ loginPage, page }) => {
    // Read from environment variables securely
    const email = process.env.TEST_USER_EMAIL!;
    const password = process.env.TEST_USER_PASSWORD!;

    await loginPage.login(email, password);
    await expect(page).toHaveURL(/main/);
  });
});
