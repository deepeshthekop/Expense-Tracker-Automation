import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';
import { NavComponent } from '../../pages/nav.component';

test.describe('Authentication Lifecycle', () => {
  let loginPage: LoginPage;
  let nav: NavComponent;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    nav = new NavComponent(page);
    await loginPage.navigateTo();
  });

  test('User can log in', async () => {
    await loginPage.login('test@xyz.com', 'Test@123');
    await expect(nav.logoLink).toBeVisible();
  });
});