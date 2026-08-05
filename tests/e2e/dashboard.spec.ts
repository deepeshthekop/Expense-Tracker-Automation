import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';
import { NavComponent } from '../../pages/nav.component';
import { DashboardPage } from '../../pages/dashboard.page';

test.describe('Dashboard Operations', () => {
  let loginPage: LoginPage;
  let nav: NavComponent;
  let dashboardPage: DashboardPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    nav = new NavComponent(page);
    dashboardPage = new DashboardPage(page);

    // Login before starting functional testing
    await loginPage.navigateTo();
    await loginPage.login(process.env.TEST_USER_EMAIL!, process.env.TEST_USER_PASSWORD!);
    await expect(page).toHaveURL(/main/);
  });

  test('User can see navigation links', async ({}) => {
    await nav.verifyNavLinksVisible();
  });

  test('User can view dashboard components', async ({}) => {
    await dashboardPage.verifyDashboardComponentsVisible();
  });

  test('User can navigate sidebar sections smoothly', async ({ page }) => {
    await nav.goToExpenses();
    await expect(page).toHaveURL(/.*expenses/);

    await nav.goToBudgets();
    await expect(page).toHaveURL(/.*budgets/);

    await nav.goToDashboard();
    await expect(page).toHaveURL(/main/);
  });
});
