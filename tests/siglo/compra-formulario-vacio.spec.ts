// spec: specs/demoblaze-test-plan.md

import { test, expect } from '@playwright/test';
import { ProductPage } from '../../src/pages/ProductPage';
import { CartPage } from '../../src/pages/CartPage';
import { OrderModal } from '../../src/pages/OrderModal';

test.describe('Compra - Formulario Vacío', () => {
  test('Intentar comprar sin completar campos muestra error o no permite avanzar', async ({ page }) => {
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);
    const orderModal = new OrderModal(page);

    // Agregar producto al carrito
    await productPage.gotoById(1);
    await expect(productPage.addToCartButton).toBeVisible();
    await productPage.addToCart();

    // Ir al carrito, clic en 'Place Order'
    await cartPage.goto();
    await expect(cartPage.productCell('Samsung galaxy s6')).toBeVisible({ timeout: 10000 });
    await cartPage.placeOrderButton.click();
    await expect(orderModal.modal).toBeVisible();

    // Sin completar campos, clic en 'Purchase'
    // La app muestra una alerta del navegador cuando los campos están vacíos.
    // Using Promise.all to avoid race condition where click() hangs on dialog.
    const errorDialog = await orderModal.clickPurchaseExpectingDialog();

    // Verificar alerta/mensaje de error (usuario vacío)
    expect(errorDialog.message()).toBeTruthy();
    await errorDialog.accept();

    // Verificar que el modal de Place order sigue abierto (no se procesó la compra)
    await expect(orderModal.modal).toBeVisible();

    // Verificar que el modal de confirmación de compra exitosa NO aparece
    await expect(orderModal.confirmationHeading).not.toBeVisible();
  });
});
