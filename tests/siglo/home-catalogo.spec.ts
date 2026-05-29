// spec: specs/demoblaze-test-plan.md

import { test, expect } from '@playwright/test';
import { HomePage } from '../../src/pages/HomePage';

test.describe('Home - Catálogo', () => {
  test('Verificar estructura completa de la home: título, logo, navbar, carrusel, categorías, grilla y footer', async ({ page }) => {
    const home = new HomePage(page);

    // Navegar a demoblaze.com
    await home.goto();

    // Verificar título 'STORE'
    await expect(page).toHaveTitle('STORE');

    // Verificar logo 'PRODUCT STORE' visible
    await expect(home.navLogo).toBeVisible();

    // Verificar navbar con enlaces: Home, Contact, About us, Cart, Log in, Sign up
    await expect(home.navHome).toBeVisible();
    await expect(home.navContact).toBeVisible();
    await expect(home.navAboutUs).toBeVisible();
    await expect(home.navCart).toBeVisible();
    await expect(home.navLogIn).toBeVisible();
    await expect(home.navSignUp).toBeVisible();

    // Verificar carrusel con controles Previous/Next visibles
    await expect(home.carouselPrevious).toBeVisible();
    await expect(home.carouselNext).toBeVisible();

    // Verificar panel de categorías: CATEGORIES, Phones, Laptops, Monitors
    await expect(home.categoryLink).toBeVisible();
    await expect(home.categoryPhones).toBeVisible();
    await expect(home.categoryLaptops).toBeVisible();
    await expect(home.categoryMonitors).toBeVisible();

    // Verificar grilla con al menos un producto (nombre en h4, precio en h5 con formato '$XXX', descripción)
    // Los productos se cargan asincrónicamente, se espera hasta 15s
    await expect(home.firstProductTitle).toBeVisible({ timeout: 15000 });
    await expect(home.firstProductPrice).toBeVisible({ timeout: 15000 });
    await expect(home.firstProductPrice).toHaveText(/^\$\d+$/);
    await expect(home.firstProductDescription).toBeVisible();

    // Verificar footer con 'Copyright © Product Store'
    await expect(home.footer).toBeVisible();
  });
});
