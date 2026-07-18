import { Page, Locator } from '@playwright/test';

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
    this.userAvatarMenu = page.getByRole('button').filter({ hasText: /^$/ }).first();
    this.signOutButton = page.getByRole('menuitem', { name: 'Sign Out' });
  }

  async goToDashboard() {
    await this.dashboardLink.click();
  }

  async goToExpenses() {
    await this.expensesLink.click();
  }

  async goToBudgets() {
    await this.budgetsLink.click();
  }

  async logout() {
    await this.userAvatarMenu.click();
    await this.signOutButton.click();
  }
}