import { Page, Locator, expect } from '@playwright/test';

export class NavComponent {
  private readonly page: Page;
  private readonly logoLink: Locator;
  private readonly dashboardLink: Locator;
  private readonly expensesLink: Locator;
  private readonly budgetsLink: Locator;
  private readonly userAvatarMenu: Locator;
  private readonly accountLink: Locator;
  private readonly signOutLink: Locator;
  private readonly themeChanger: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logoLink = page.getByRole('link', { name: 'Expense Tracker' });
    this.dashboardLink = page.getByRole('link', { name: 'Dashboard' });
    this.expensesLink = page.getByRole('link', { name: 'Expenses' });
    this.budgetsLink = page.getByRole('link', { name: 'Budgets' });
    // Refactored from brittle page.locator('img') to semantic layout roles
    this.userAvatarMenu = page.getByTestId('user-menu-dropdown');
    this.signOutLink = page.getByRole('menuitem', { name: 'Sign Out' });
    this.themeChanger = page.getByTestId('theme-toggle');
  }

  async verifyNavLinksVisible() {
    await expect(this.logoLink).toBeVisible();
    await expect(this.dashboardLink).toBeVisible();
    await expect(this.expensesLink).toBeVisible();
    await expect(this.budgetsLink).toBeVisible();
    await expect(this.userAvatarMenu).toBeVisible();
    await expect(this.themeChanger).toBeVisible();
  }

  async goToHomepage() {
    await this.logoLink.click();
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

  async toggleTheme() {
    await this.themeChanger.click();
  }

  async goToAccount() {
    await this.userAvatarMenu.click();
    await this.accountLink.click();
  }

  async logout() {
    await this.userAvatarMenu.click();
    await this.signOutLink.click();
  }

  async navigateToHome() {
    await this.page.goto('/main');
  }
}
