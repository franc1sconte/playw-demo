import { Page, Locator, expect } from '@playwright/test';

export class LoginModal {
  readonly page: Page;

  readonly modal: Locator;
  readonly usernameField: Locator;
  readonly passwordField: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.modal = page.getByRole('dialog', { name: 'Log in' });
    // The login modal labels have mismatched for/id attributes (for="log-name" but id="loginusername"),
    // so role-based lookup by name fails. Using stable element IDs instead.
    this.usernameField = page.locator('#loginusername');
    this.passwordField = page.locator('#loginpassword');
    this.loginButton = this.modal.getByRole('button', { name: 'Log in' });
  }

  async waitForOpen() {
    await expect(this.modal).toBeVisible();
    await expect(this.usernameField).toBeVisible();
  }
}
