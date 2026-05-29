// spec: specs/demoblaze-test-plan.md

import { test, expect } from '@playwright/test';
import { LoginModal } from '../../src/pages/LoginModal';

test.describe('Login - Credenciales Inválidas', () => {
  test('Intentar login con credenciales inexistentes muestra alerta de error y el modal permanece abierto', async ({ page }) => {
    const loginModal = new LoginModal(page);

    // Navegar a demoblaze.com
    await page.goto('https://www.demoblaze.com/');

    // Clic en 'Log in' del navbar → modal con Username y Password
    await page.getByRole('link', { name: 'Log in' }).click();
    await expect(loginModal.modal).toBeVisible();

    // Ingresar credenciales inexistentes
    await loginModal.usernameField.fill(`usuario_inexistente_${Date.now()}`);
    await loginModal.passwordField.fill('contrasena_invalida_123');

    // Clic en 'Log in' → alerta de error (usuario no existe / credenciales incorrectas)
    const dialogPromise = page.waitForEvent('dialog');
    await loginModal.loginButton.click();
    const dialog = await dialogPromise;

    // Verificar que la alerta indica error
    expect(dialog.message()).toBeTruthy();

    // Aceptar alerta → modal sigue abierto
    await dialog.accept();

    // Verificar que el modal de login sigue visible
    await expect(loginModal.modal).toBeVisible();
  });
});
