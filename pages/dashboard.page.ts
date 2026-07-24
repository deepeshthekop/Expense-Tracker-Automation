import { Page, Locator } from '@playwright/test';

export class DashboardPage {
  private readonly page: Page;
  readonly totalBudgetCard: Locator;
  readonly totalRemainingCard: Locator;
  readonly totalSpendCard: Locator;
  readonly recentExpensesSection: Locator;
  readonly LastSevenExpenses: Locator;

  constructor(page: Page) {
    this.page = page;
    // Cleans up the generic container filters into exact, readable assertions
    this.totalBudgetCard = page.locator('div').filter({ hasText: /^Total Budget/ }).first(); // This line initializes the totalBudgetCard property by locating a div element that contains text starting with "Total Budget". The filter method is used to narrow down the selection to elements that match the specified text pattern, and first() ensures that only the first matching element is selected. This approach makes the locator more robust and readable, as it clearly indicates what the test is looking for on the page.
    this.totalRemainingCard = page.locator('div').filter({ hasText: /^Total Remaining/ }).first();
    this.totalSpendCard = page.locator('div').filter({ hasText: /^Total Spend/ }).first();
    this.recentExpensesSection = page.locator('div').filter({ hasText: /^Recent Expenses/ }).first();
    this.LastSevenExpenses = page.locator('div').filter({ hasText: /^Last 7 Expenses/ }).first();
  }
}