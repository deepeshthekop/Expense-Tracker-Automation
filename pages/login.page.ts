import { Page, Locator } from '@playwright/test';

export class LoginPage {
  private readonly page: Page;
  private readonly loginLandingButton: Locator;
  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly signInButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginLandingButton = page.getByRole('button', { name: 'Login' });
    this.emailInput = page.getByRole('textbox', { name: 'Email' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.signInButton = page.getByRole('button', { name: 'Sign In' });
  }

  async navigateTo() {
    await this.page.goto('/');
  }

  async login(email: string, password: string) {
    // If you are already on the landing page, hit the main login trigger
    if (await this.loginLandingButton.isVisible()) {
      await this.loginLandingButton.click();
    }
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.signInButton.click();
  }
}