import { test, expect } from '../../fixtures/page-fixtures';

test.describe('Dashboard Operations', () => {
  test.beforeEach(async ({ navComponent }) => {
    await navComponent.navigateToHome();
  });

  test('User can see navigation links', async ({ navComponent }) => {
    await navComponent.verifyNavLinksVisible();
  });

  test('User can view dashboard components', async ({ dashboardPage }) => {
    await dashboardPage.verifyDashboardComponentsVisible();
  });

  test('User can navigate sidebar sections smoothly', async ({ navComponent, page }) => {
    await navComponent.goToExpenses();
    await expect(page).toHaveURL(/.*expenses/);

    await navComponent.goToBudgets();
    await expect(page).toHaveURL(/.*budgets/);

    await navComponent.goToDashboard();
    await expect(page).toHaveURL(/main/);
  });
});
