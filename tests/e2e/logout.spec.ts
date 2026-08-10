import { test, expect } from '@playwright/test';
import { NavComponent } from '../../pages/nav.component';

test.describe('Logout Functionality', () => {
  let nav: NavComponent;

  test.beforeEach(async ({ page }) => {
    nav = new NavComponent(page);

    await nav.navigateToHome();
  });

  test('User can log out', async ({ page }) => {
    // Perform logout
    await nav.logout();

    // Verify redirection to the login page
    await expect(page).toHaveURL(/auth\/signin/);
  });
});
