import { test, expect } from '@playwright/test'; // The import statement is used to bring in the test and expect functions from the Playwright testing library. The test function is used to define test cases, while the expect function is used for making assertions about the state of the application during testing.
import { LoginPage } from '../../pages/login.page'; // The import statement is used to bring in the LoginPage class from the specified file path. This allows the test file to create instances of the LoginPage class and use its methods to interact with the login page of the application.
import { NavComponent } from '../../pages/nav.component';

test.describe('Authentication Lifecycle', () => {
  let loginPage: LoginPage; // This line declares a variable named loginPage of type LoginPage. The let keyword allows the variable to be reassigned later. This variable will hold an instance of the LoginPage class, which provides methods for interacting with the login page of the application.
  let nav: NavComponent; // This line declares a variable named nav of type NavComponent. Similar to the loginPage variable, this variable will hold an instance of the NavComponent class, which provides methods for interacting with the navigation component of the application.

  test.beforeEach(async ({ page }) => { // { page } provides a fresh, isolated browser tab/context for each test run to ensure tests don't leak state into each other.
    loginPage = new LoginPage(page); // This line creates a new instance of the LoginPage class, passing the page object as an argument to its constructor. The resulting instance is assigned to the loginPage variable, allowing the test to use its methods to interact with the login page.
    nav = new NavComponent(page);
    await loginPage.navigateTo();
  });

  test('User can log in', async ({ page }) => {
    await loginPage.login('test@xyz.com', 'Test@123');
    await expect(nav.logoLink).toBeVisible();
  });
});