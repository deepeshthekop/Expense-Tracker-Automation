import { Page, Locator, expect } from '@playwright/test';

export class DashboardPage {
  private readonly page: Page;
  private readonly welcomeGreeting: Locator;
  private readonly welcomeStaticText: Locator;
  private readonly totalBudgetCard: Locator;
  private readonly totalRemainingCard: Locator;
  private readonly totalSpendCard: Locator;
  private readonly recentExpensesSection: Locator;
  private readonly lastSevenExpenses: Locator;

  constructor(page: Page) {
    this.page = page;
    // Cleans up the generic container filters into exact, readable assertions
    this.welcomeGreeting = page.locator('div').filter({ hasText: /^Hi, / }).first();
    this.welcomeStaticText = page
      .locator('p')
      .filter({ hasText: /^Here are your expenses at a glance./ })
      .first();
    this.totalBudgetCard = page
      .locator('div')
      .filter({ hasText: /^Total Budget/ })
      .first(); // This line initializes the totalBudgetCard property by locating a div element that contains text starting with "Total Budget". The filter method is used to narrow down the selection to elements that match the specified text pattern, and first() ensures that only the first matching element is selected. This approach makes the locator more robust and readable, as it clearly indicates what the test is looking for on the page.
    this.totalRemainingCard = page
      .locator('div')
      .filter({ hasText: /^Total Remaining/ })
      .first();
    this.totalSpendCard = page
      .locator('div')
      .filter({ hasText: /^Total Spend/ })
      .first();
    this.recentExpensesSection = page
      .locator('div')
      .filter({ hasText: /^Recent Expenses/ })
      .first();
    this.lastSevenExpenses = page
      .locator('div')
      .filter({ hasText: /^Last 7 Expenses/ })
      .first();
  }

  async verifyDashboardComponentsVisible() {
    await expect(this.welcomeGreeting).toBeVisible();
    await expect(this.welcomeStaticText).toBeVisible();
    await expect(this.totalBudgetCard).toBeVisible();
    await expect(this.totalRemainingCard).toBeVisible();
    await expect(this.totalSpendCard).toBeVisible();
    await expect(this.recentExpensesSection).toBeVisible();
    await expect(this.lastSevenExpenses).toBeVisible();
  }
}
