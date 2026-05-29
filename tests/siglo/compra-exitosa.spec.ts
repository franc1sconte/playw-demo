// spec: specs/demoblaze-test-plan.md

import { test, expect } from '@playwright/test';
import { ProductPage } from '../../src/pages/ProductPage';
import { CartPage } from '../../src/pages/CartPage';
import { OrderModal } from '../../src/pages/OrderModal';

test.describe('Compra Exitosa', () => {
  test('Completar el formulario de Place Order y confirmar la compra muestra el modal de éxito con los datos correctos', async ({ page }) => {
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);
    const orderModal = new OrderModal(page);

    // Agregar producto al carrito
    await productPage.gotoById(1);
    await expect(productPage.addToCartButton).toBeVisible();
    await productPage.addToCart();

    // Ir al carrito
    await cartPage.goto();
    await expect(cartPage.productCell('Samsung galaxy s6')).toBeVisible({ timeout: 10000 });

    // Clic en 'Place Order' → modal con campos de formulario
    await cartPage.placeOrderButton.click();

    // Verificar que el modal Place order está visible con todos los campos
    await expect(orderModal.modal).toBeVisible();
    await expect(orderModal.nameField).toBeVisible();
    await expect(orderModal.countryField).toBeVisible();
    await expect(orderModal.cityField).toBeVisible();
    await expect(orderModal.creditCardField).toBeVisible();
    await expect(orderModal.monthField).toBeVisible();
    await expect(orderModal.yearField).toBeVisible();

    // Completar todos los campos
    await orderModal.nameField.fill('Test User');
    await orderModal.countryField.fill('Argentina');
    await orderModal.cityField.fill('Buenos Aires');
    await orderModal.creditCardField.fill('4111111111111111');
    await orderModal.monthField.fill('12');
    await orderModal.yearField.fill('2026');

    // Clic en 'Purchase'
    await orderModal.purchaseButton.click();

    // Verificar modal de confirmación 'Thank you for your purchase!'
    await expect(orderModal.confirmationHeading).toBeVisible();

    // Verificar que el modal contiene Id, Amount, Card Number, Name, Date
    await expect(orderModal.confirmationText).toContainText('Amount:');
    await expect(orderModal.confirmationText).toContainText('Card Number:');
    await expect(orderModal.confirmationText).toContainText('Name:');
    await expect(orderModal.confirmationText).toContainText('Date:');

    // Verificar botón OK visible
    await expect(orderModal.okButton).toBeVisible();

    // Clic en OK → modal se cierra
    await orderModal.okButton.click();

    // Verificar que el modal se cerró (vuelve a la home)
    await expect(orderModal.confirmationHeading).not.toBeVisible();
  });
});
