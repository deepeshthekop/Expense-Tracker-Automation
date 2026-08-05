import { Page, Locator } from '@playwright/test'; // The import statement is used to bring in the Page and Locator from the Playwright testing library, which are used to interact with web pages and locate elements.

export class LoginPage {
  // The export keyword is used to make the class available for import in other files
  private readonly page: Page; //  This line declares a private property named page of type Page. This property will hold a reference to the Playwright Page object, which represents a single tab or window in the browser. The readonly modifier indicates that this property can only be assigned once, typically in the constructor, and cannot be modified afterward.
  private readonly loginLandingButton: Locator;
  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly signInButton: Locator;

  constructor(page: Page) {
    // The constructor is a special method that is called when a new instance of the class is created. It takes a single parameter, page, which is expected to be an instance of the Page class from Playwright. This parameter is used to initialize the page property of the class.
    this.page = page; // This line assigns the page parameter passed to the constructor to the private property page of the class. This allows the class to use the Page object for interacting with the web page throughout its methods.
    this.loginLandingButton = page.getByRole('button', { name: 'Login' }); // This line initializes the loginLandingButton property by using the getByRole method of the Page object to locate a button element with the accessible name 'Login'. The Locator type is used to represent this element, allowing for interactions such as clicking or checking visibility.
    this.emailInput = page.getByRole('textbox', { name: 'Email' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.signInButton = page.getByRole('button', { name: 'Sign In' });
  }

  async navigateTo() {
    await this.page.goto('/'); // This line uses the goto method of the Page object to navigate to the root URL ('/') of the web application. The await keyword is used to pause the execution of the function until the navigation is complete, ensuring that subsequent actions are performed on the correct page.
  }

  async login(email: string, password: string) {
    // This line defines an asynchronous method named login that takes two parameters: email and password, both of which are strings. The async keyword indicates that this method will perform asynchronous operations, allowing the use of await within its body to handle promises returned by Playwright methods.
    // If you are already on the landing page, hit the main login trigger
    if (await this.loginLandingButton.isVisible()) {
      await this.loginLandingButton.click();
    }
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.signInButton.click();
  }
}
