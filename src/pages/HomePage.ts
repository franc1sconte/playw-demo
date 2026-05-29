import { Page, Locator, expect } from '@playwright/test';

export class HomePage {
  readonly page: Page;

  // Navbar
  readonly navLogo: Locator;
  readonly navHome: Locator;
  readonly navContact: Locator;
  readonly navAboutUs: Locator;
  readonly navCart: Locator;
  readonly navLogIn: Locator;
  readonly navSignUp: Locator;

  // Carousel
  readonly carouselPrevious: Locator;
  readonly carouselNext: Locator;

  // Categories
  readonly categoryLink: Locator;
  readonly categoryPhones: Locator;
  readonly categoryLaptops: Locator;
  readonly categoryMonitors: Locator;

  // Product grid
  readonly firstProductTitle: Locator;
  readonly firstProductPrice: Locator;
  readonly firstProductDescription: Locator;

  // Pagination
  readonly paginationNext: Locator;
  readonly paginationPrevious: Locator;

  // Footer
  readonly footer: Locator;

  constructor(page: Page) {
    this.page = page;

    this.navLogo = page.getByRole('link', { name: 'PRODUCT STORE' }).first();
    this.navHome = page.getByRole('link', { name: 'Home (current)' });
    this.navContact = page.getByRole('link', { name: 'Contact' });
    this.navAboutUs = page.getByRole('link', { name: 'About us' });
    this.navCart = page.getByRole('link', { name: 'Cart', exact: true });
    this.navLogIn = page.getByRole('link', { name: 'Log in' });
    this.navSignUp = page.getByRole('link', { name: 'Sign up' });

    this.carouselPrevious = page.getByRole('button', { name: 'Previous' }).first();
    this.carouselNext = page.getByRole('button', { name: 'Next' }).first();

    this.categoryLink = page.getByRole('link', { name: 'CATEGORIES' });
    this.categoryPhones = page.getByRole('link', { name: 'Phones' });
    this.categoryLaptops = page.getByRole('link', { name: 'Laptops' });
    this.categoryMonitors = page.getByRole('link', { name: 'Monitors' });

    this.firstProductTitle = page.locator('.card-title a').first();
    this.firstProductPrice = page.locator('.card-block h5').first();
    this.firstProductDescription = page.locator('.card-block p').first();

    this.paginationNext = page.getByRole('button', { name: 'Next' }).last();
    this.paginationPrevious = page.getByRole('button', { name: 'Previous' }).last();

    this.footer = page.getByText('Copyright © Product Store');
  }

  async goto() {
    await this.page.goto('https://www.demoblaze.com/');
  }

  async waitForProductGrid() {
    await expect(this.firstProductTitle).toBeVisible({ timeout: 15000 });
  }

  async getFirstProductText(): Promise<string> {
    await this.waitForProductGrid();
    return (await this.firstProductTitle.textContent()) ?? '';
  }

  productTitleByName(name: string): Locator {
    return this.page.getByRole('link', { name }).first();
  }

  productHeadingByName(name: string): Locator {
    return this.page.getByRole('heading', { name });
  }
}
