import { test as setup, expect } from '../fixtures/page-fixtures';
import path from 'path';

const authFile = path.resolve(process.cwd(), '.auth/user.json');

setup('Authenticate', async ({ loginPage, page }) => {
  await loginPage.navigateToLogin();
  await loginPage.login(process.env.TEST_USER_EMAIL!, process.env.TEST_USER_PASSWORD!);
  await expect(page).toHaveURL(/.*main/);

  // Save storage state (cookies + localStorage) to disk
  await page.context().storageState({ path: authFile });
});
