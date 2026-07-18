import { Page, Locator } from '@playwright/test';

export class DashboardPage {
  private readonly page: Page;
  readonly totalBudgetCard: Locator;
  readonly totalRemainingCard: Locator;
  readonly totalSpendCard: Locator;
  readonly recentExpensesSection: Locator;

  constructor(page: Page) {
    this.page = page;
    // Cleans up the generic container filters into exact, readable assertions
    this.totalBudgetCard = page.locator('div').filter({ hasText: /^Total Budget/ }).first();
    this.totalRemainingCard = page.locator('div').filter({ hasText: /^Total Remaining/ }).first();
    this.totalSpendCard = page.locator('div').filter({ hasText: /^Total Spend/ }).first();
    this.recentExpensesSection = page.getByText('Recent Expenses');
  }
}