import { Page, Locator, expect } from '@playwright/test';

export class NavComponent {
  private readonly page: Page;
  readonly logoLink: Locator;
  private readonly dashboardLink: Locator;
  private readonly expensesLink: Locator;
  private readonly budgetsLink: Locator;
  private readonly userAvatarMenu: Locator;
  private readonly signOutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logoLink = page.getByRole('link', { name: 'Expense Tracker' });
    this.dashboardLink = page.getByRole('link', { name: 'Dashboard' });
    this.expensesLink = page.getByRole('link', { name: 'Expenses' });
    this.budgetsLink = page.getByRole('link', { name: 'Budgets' });
    // Refactored from brittle page.locator('img') to semantic layout roles
    this.userAvatarMenu = page.getByRole('button').filter({ hasText: /^$/ }).first(); // This line locates the user avatar menu button by finding a button element with no visible text (indicated by the regex /^$/) and selects the first occurrence. This approach is more robust than relying on specific image selectors, as it uses semantic roles to identify the element.
    this.signOutButton = page.getByRole('menuitem', { name: 'Sign Out' });
  }

  async goToDashboard() {
    await this.dashboardLink.click();
    await expect(this.page).toHaveURL(/main/);
  }

  async goToExpenses() {
    await this.expensesLink.click();
    await expect(this.page).toHaveURL(/.*expenses/);
  }

  async goToBudgets() {
    await this.budgetsLink.click();
    await expect(this.page).toHaveURL(/.*budgets/);
  }

  async logout() {
    await this.userAvatarMenu.click();
    await this.signOutButton.click();
    await expect(this.page).toHaveURL('/auth/signin');
  }
}