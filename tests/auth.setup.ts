// tests/auth.setup.ts
import { test as setup, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import path from 'path';

// Path where session state will be stored
const authFile = path.resolve(process.cwd(), '.auth/user.json');

setup('Authenticate', async ({ page }) => {
  const loginPage = new LoginPage(page);

  // 1. Navigate to login page
  await loginPage.navigateToLogin();

  // 2. Login using environment variables
  await loginPage.login(process.env.TEST_USER_EMAIL!, process.env.TEST_USER_PASSWORD!);

  // 3. Verify successful login
  await expect(page).toHaveURL(/.*main/);

  // 4. Save storage state (cookies + localStorage) to disk
  await page.context().storageState({ path: authFile });
});
