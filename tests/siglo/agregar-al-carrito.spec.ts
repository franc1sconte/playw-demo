// spec: specs/demoblaze-test-plan.md

import { test, expect } from '@playwright/test';
import { ProductPage } from '../../src/pages/ProductPage';
import { CartPage } from '../../src/pages/CartPage';

test.describe('Agregar al Carrito', () => {
  test('Agregar un producto al carrito muestra alerta de confirmación y el producto aparece en el carrito con precio y enlace Delete', async ({ page }) => {
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);

    // Navegar a detalle de un producto
    await productPage.gotoById(1);

    // Esperar que el botón Add to cart esté visible
    await expect(productPage.addToCartButton).toBeVisible();

    // Clic en 'Add to cart' → alerta 'Product added', aceptarla
    const dialogMessage = await productPage.addToCart();
    expect(dialogMessage).toBe('Product added');

    // Navegar a Cart
    await cartPage.goto();

    // Esperar que el carrito cargue con el producto (usa .first() para manejar items múltiples)
    await expect(cartPage.productCell('Samsung galaxy s6')).toBeVisible({ timeout: 10000 });

    // Verificar nombre del producto en el carrito
    await expect(cartPage.productCell('Samsung galaxy s6')).toBeVisible();

    // Verificar precio en el carrito
    await expect(cartPage.priceCell('360')).toBeVisible();

    // Verificar enlace 'Delete' visible
    await expect(cartPage.firstDeleteLink()).toBeVisible();

    // Verificar que el total contiene un número positivo.
    // La app demoblaze usa un carrito anónimo compartido en el servidor, por lo que el total
    // puede acumular items de otras ejecuciones; se verifica que existe y es numérico.
    await expect(cartPage.anyTotalHeading).toBeVisible();
    await expect(cartPage.anyTotalHeading).toHaveText(/^\d+$/);
  });
});
