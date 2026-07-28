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
    this.userAvatarMenu = page.getByRole('button').filter({ hasText: /^$/ }).first(); // This line locates the user avatar menu button by finding a button element with no visible text (indicated by the regex /^$/) and selects the first occurrence. This approach is more robust than relying on specific image selectors, as it uses semantic roles to identify the element.
    this.signOutLink = page.getByRole('menuitem', { name: 'Sign Out' });
    this.themeChanger = page.getByRole('button', { name: 'Toggle theme' }); // await page.getByRole('button').first();
  }

  async verifyNavLinksVisible() {
    await expect(this.logoLink).toBeVisible();
    await expect(this.dashboardLink).toBeVisible();
    await expect(this.expensesLink).toBeVisible();
    await expect(this.budgetsLink).toBeVisible();
    await expect(this.userAvatarMenu).toBeVisible();
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
}