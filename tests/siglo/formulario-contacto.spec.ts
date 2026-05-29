// spec: specs/demoblaze-test-plan.md

import { test, expect } from '@playwright/test';
import { ContactModal } from '../../src/pages/ContactModal';

test.describe('Formulario de Contacto', () => {
  test('Completar y enviar el formulario de contacto muestra alerta de confirmación y cierra el modal', async ({ page }) => {
    const contactModal = new ContactModal(page);

    // Navegar a demoblaze.com
    await page.goto('https://www.demoblaze.com/');

    // Clic en 'Contact' del navbar → modal 'New message'
    await page.getByRole('link', { name: 'Contact' }).click();
    await contactModal.waitForOpen();

    // Verificar campos del formulario
    await expect(contactModal.emailField).toBeVisible();
    await expect(contactModal.nameField).toBeVisible();
    await expect(contactModal.messageField).toBeVisible();

    // Completar y enviar con alerta de confirmación
    const message = await contactModal.sendMessage(
      'test@example.com',
      'Test User',
      'Este es un mensaje de prueba para el formulario de contacto.',
    );

    // Verificar alerta de confirmación
    expect(message).toBeTruthy();

    // Verificar que el modal de contacto ya no está visible
    await expect(contactModal.modal).not.toBeVisible();
  });
});
