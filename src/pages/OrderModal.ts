import { Page, Locator } from '@playwright/test';

export class OrderModal {
  readonly page: Page;

  readonly modal: Locator;
  readonly nameField: Locator;
  readonly countryField: Locator;
  readonly cityField: Locator;
  readonly creditCardField: Locator;
  readonly monthField: Locator;
  readonly yearField: Locator;
  readonly purchaseButton: Locator;

  // Confirmation modal
  readonly confirmationHeading: Locator;
  readonly confirmationText: Locator;
  readonly okButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.modal = page.getByRole('dialog', { name: 'Place order' });
    // The order modal's Name field label has mismatched for/id in some contexts;
    // using the element ID directly for reliability.
    this.nameField = page.locator('#name');
    this.countryField = page.locator('#country');
    this.cityField = page.locator('#city');
    this.creditCardField = page.locator('#card');
    this.monthField = page.locator('#month');
    this.yearField = page.locator('#year');
    this.purchaseButton = page.getByRole('button', { name: 'Purchase' });

    this.confirmationHeading = page.getByRole('heading', { name: 'Thank you for your purchase!' });
    this.confirmationText = page.locator('.sweet-alert p, .sa-text');
    this.okButton = page.getByRole('button', { name: 'OK' });
  }

  /**
   * Clicks Purchase and waits for the browser dialog that appears when fields are empty.
   * The click triggers alert() synchronously, blocking Playwright's click() from returning.
   * Fire-and-forget the click, then await the dialog event separately.
   */
  async clickPurchaseExpectingDialog(): Promise<import('@playwright/test').Dialog> {
    const dialogPromise = this.page.waitForEvent('dialog');
    this.purchaseButton.click().catch(() => {/* navigation after dialog is expected */});
    const dialog = await dialogPromise;
    return dialog;
  }
}
