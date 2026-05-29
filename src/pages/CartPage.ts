import { Page, Locator } from '@playwright/test';

export class CartPage {
  readonly page: Page;

  readonly placeOrderButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.placeOrderButton = page.getByRole('button', { name: 'Place Order' });
  }

  async goto() {
    await this.page.goto('https://www.demoblaze.com/cart.html');
  }

  /**
   * Returns the first visible cell for the given product name in the cart table.
   * Using .first() to handle strict mode when the same product is in cart multiple times.
   */
  productCell(productName: string): Locator {
    return this.page.getByRole('cell', { name: productName }).first();
  }

  /**
   * Returns all cells for the given product name.
   * Useful for counting how many copies of a product are in the cart.
   */
  productCells(productName: string): Locator {
    return this.page.getByRole('cell', { name: productName });
  }

  /**
   * Returns the first price cell for the given price.
   */
  priceCell(price: string): Locator {
    return this.page.getByRole('cell', { name: price }).first();
  }

  /**
   * Returns the first Delete link (for first cart item).
   */
  firstDeleteLink(): Locator {
    return this.page.getByRole('link', { name: 'Delete' }).first();
  }

  /**
   * Returns the total heading for a specific amount.
   */
  totalHeading(amount: string): Locator {
    return this.page.getByRole('heading', { name: amount, level: 3 });
  }

  /**
   * Returns the total heading element regardless of the displayed amount.
   * Useful when the cart has accumulated items from other test runs (shared anonymous cart).
   */
  get anyTotalHeading(): Locator {
    return this.page.locator('#totalp');
  }
}
