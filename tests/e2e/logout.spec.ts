import { test, expect } from '../../fixtures/page-fixtures';

test.describe('Logout Functionality', () => {
  test.beforeEach(async ({ navComponent }) => {
    await navComponent.navigateToHome();
  });

  test('User can log out', async ({ navComponent, page }) => {
    await navComponent.logout();
    await expect(page).toHaveURL(/auth\/signin/);
  });
});
