import { test as base } from '@playwright/test'; // Import the base test from Playwright
import { LoginPage } from '../pages/login.page'; // Import your login page objects
import { NavComponent } from '../pages/nav.component'; // Import your navigation component objects
import { DashboardPage } from '../pages/dashboard.page'; // Import your dashboard page object

// 1. Define the types for your custom fixtures
type MyFixtures = {
  loginPage: LoginPage; // Define the type for the login page fixture
  navComponent: NavComponent; // Define the type for the navigation component fixture
  dashboardPage: DashboardPage; // Define the type for the dashboard page fixture
};

// 2. Extend base test to include your custom fixtures
export const test = base.extend<MyFixtures>({
  // Extend the base test with custom fixtures
  loginPage: async ({ page }, use) => {
    // Define the login page fixture
    await use(new LoginPage(page)); // Provide the login page instance to the test
  },

  navComponent: async ({ page }, use) => {
    await use(new NavComponent(page)); // Provide the navigation component instance to the test
  },

  dashboardPage: async ({ page }, use) => {
    await use(new DashboardPage(page)); // Provide the dashboard page instance to the test
  },
});

export { expect } from '@playwright/test'; // Export expect for assertions in tests
