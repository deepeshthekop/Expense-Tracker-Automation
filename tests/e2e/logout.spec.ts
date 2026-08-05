import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';
import { NavComponent } from '../../pages/nav.component';

test.describe('Logout Functionality', () => {
  let loginPage: LoginPage;
  let nav: NavComponent;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    nav = new NavComponent(page);

    // Navigate to the login page and log in
    await loginPage.navigateTo();
    await loginPage.login(process.env.TEST_USER_EMAIL!, process.env.TEST_USER_PASSWORD!);
    await expect(page).toHaveURL(/main/); // Verify successful login
  });

  test('User can log out', async ({ page }) => {
    // Perform logout
    await nav.logout();

    // Verify redirection to the login page
    await expect(page).toHaveURL(/auth\/signin/);
  });
});
