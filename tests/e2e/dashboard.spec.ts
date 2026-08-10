import { test, expect } from '@playwright/test';
import { NavComponent } from '../../pages/nav.component';
import { DashboardPage } from '../../pages/dashboard.page';

test.describe('Dashboard Operations', () => {
  let nav: NavComponent;
  let dashboardPage: DashboardPage;

  test.beforeEach(async ({ page }) => {
    nav = new NavComponent(page);
    dashboardPage = new DashboardPage(page);

    await nav.navigateToHome();
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
