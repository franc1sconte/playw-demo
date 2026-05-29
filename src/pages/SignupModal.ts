import { Page, Locator, expect } from '@playwright/test';

export class SignupModal {
  readonly page: Page;

  readonly modal: Locator;
  readonly usernameField: Locator;
  readonly passwordField: Locator;
  readonly signupButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.modal = page.getByRole('dialog', { name: 'Sign up' });
    this.usernameField = this.modal.getByRole('textbox', { name: 'Username:' });
    this.passwordField = this.modal.getByRole('textbox', { name: 'Password:' });
    this.signupButton = this.modal.getByRole('button', { name: 'Sign up' });
  }

  async waitForOpen() {
    await expect(this.modal).toBeVisible();
    await expect(this.usernameField).toBeVisible();
  }
}
