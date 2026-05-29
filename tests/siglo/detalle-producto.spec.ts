// spec: specs/demoblaze-test-plan.md

import { test, expect } from '@playwright/test';
import { HomePage } from '../../src/pages/HomePage';
import { ProductPage } from '../../src/pages/ProductPage';

test.describe('Detalle de Producto', () => {
  test('La página de detalle muestra nombre, precio con tax, descripción, botón Add to cart y navbar consistente', async ({ page }) => {
    const home = new HomePage(page);
    const product = new ProductPage(page);

    // Navegar a demoblaze.com y esperar que la grilla cargue
    await home.goto();
    await home.waitForProductGrid();

    // Clic en el producto Samsung galaxy s6
    const samsungLink = home.productTitleByName('Samsung galaxy s6');
    await expect(samsungLink).toBeVisible();
    await samsungLink.click();

    // Verificar URL del detalle
    await expect(page).toHaveURL(/prod\.html/);

    // Verificar nombre visible en h2 (el nombre es poblado por JS asincrónicamente)
    await expect(product.productName).toBeVisible({ timeout: 15000 });

    // Verificar precio con '*includes tax'
    await expect(product.productPrice).toContainText('*includes tax');

    // Verificar separadores hr visibles (el detalle tiene separadores entre secciones)
    await expect(product.separator).toBeVisible();

    // Verificar descripción bajo 'Product description'
    await expect(product.productDescriptionLabel).toBeVisible();
    await expect(product.productDescription).toBeVisible();

    // Verificar botón 'Add to cart' visible
    await expect(product.addToCartButton).toBeVisible();

    // Verificar consistencia del navbar
    await expect(product.navLogo).toBeVisible();
    await expect(product.navHome).toBeVisible();
    await expect(product.navCart).toBeVisible();
    await expect(product.navLogIn).toBeVisible();
    await expect(product.navSignUp).toBeVisible();
  });
});
