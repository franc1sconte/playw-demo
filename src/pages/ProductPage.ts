import { Page, Locator } from '@playwright/test';

export class ProductPage {
  readonly page: Page;

  readonly productName: Locator;
  readonly productPrice: Locator;
  readonly productDescription: Locator;
  readonly addToCartButton: Locator;
  readonly separator: Locator;
  readonly productDescriptionLabel: Locator;
  readonly productDescriptionText: Locator;

  // Navbar (consistent on all pages)
  readonly navLogo: Locator;
  readonly navHome: Locator;
  readonly navCart: Locator;
  readonly navLogIn: Locator;
  readonly navSignUp: Locator;

  constructor(page: Page) {
    this.page = page;

    // The product name is rendered dynamically by JS into an h2 inside the product content area.
    // Using a broad h2 locator since the product detail page only has one h2 (the product name).
    this.productName = page.locator('h2');
    this.productPrice = page.getByRole('heading', { level: 3 });
    this.productDescription = page.locator('.product-content p, #more-information p').first();
    this.addToCartButton = page.getByRole('link', { name: 'Add to cart' });
    this.separator = page.locator('hr').first();
    this.productDescriptionLabel = page.locator('strong').filter({ hasText: 'Product description' });

    // Navbar uses exact:true to avoid matching "Add to cart" for "Cart"
    this.navLogo = page.getByRole('link', { name: 'PRODUCT STORE' }).first();
    this.navHome = page.getByRole('link', { name: 'Home (current)' });
    this.navCart = page.getByRole('link', { name: 'Cart', exact: true });
    this.navLogIn = page.getByRole('link', { name: 'Log in' });
    this.navSignUp = page.getByRole('link', { name: 'Sign up' });
  }

  async gotoById(productId: number) {
    await this.page.goto(`https://www.demoblaze.com/prod.html?idp_=${productId}`);
  }

  async addToCart(): Promise<string> {
    const dialogPromise = this.page.waitForEvent('dialog');
    await this.addToCartButton.click();
    const dialog = await dialogPromise;
    const message = dialog.message();
    await dialog.accept();
    return message;
  }
}
