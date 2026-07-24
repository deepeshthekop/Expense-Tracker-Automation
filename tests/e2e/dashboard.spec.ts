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

    // Seed/Authenticate state before starting functional metrics
    await loginPage.navigateTo();
    await loginPage.login('test@xyz.com', 'Test@123');
  });

  test('User can navigate sidebar sections smoothly', async ({ page }) => {
    await nav.goToExpenses();
    await expect(page).toHaveURL(/.*expenses/);

    await nav.goToBudgets();
    await expect(page).toHaveURL(/.*budgets/);

    await nav.goToDashboard();
    await expect(page).toHaveURL(/.*dashboard/);
  });

  test('Financial summary indicators display properly', async () => {
    await expect(dashboardPage.totalBudgetCard).toBeVisible();
    await expect(dashboardPage.totalRemainingCard).toBeVisible();
    await expect(dashboardPage.totalSpendCard).toBeVisible();
    await expect(dashboardPage.recentExpensesSection).toBeVisible();
  });
});