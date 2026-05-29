import { Page, Locator, expect } from '@playwright/test';

export class ContactModal {
  readonly page: Page;

  readonly modal: Locator;
  readonly emailField: Locator;
  readonly nameField: Locator;
  readonly messageField: Locator;
  readonly sendMessageButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.modal = page.getByRole('dialog', { name: 'New message' });
    // The email label has a broken for="recipient-name" (should be recipient-email),
    // so we locate by stable element ID instead.
    this.emailField = page.locator('#recipient-email');
    this.nameField = page.locator('#recipient-name');
    this.messageField = page.locator('#message-text');
    this.sendMessageButton = this.modal.getByRole('button', { name: 'Send message' });
  }

  async waitForOpen() {
    await expect(this.modal).toBeVisible();
    await expect(this.emailField).toBeVisible();
  }

  async sendMessage(email: string, name: string, message: string): Promise<string> {
    await this.waitForOpen();
    await this.emailField.fill(email);
    await this.nameField.fill(name);
    await this.messageField.fill(message);

    // The click triggers alert() synchronously which blocks Playwright's click() from returning.
    // Fire the click without awaiting, then wait for the dialog event to resolve.
    const dialogPromise = this.page.waitForEvent('dialog');
    this.sendMessageButton.click().catch(() => {/* navigation after dialog is expected */});
    const dialog = await dialogPromise;
    const message_ = dialog.message();
    await dialog.accept();
    return message_;
  }
}
