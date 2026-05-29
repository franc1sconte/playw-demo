// spec: specs/demoblaze-test-plan.md

import { test, expect } from '@playwright/test';

test.describe('Registro de Usuario', () => {
  test('Registrar un nuevo usuario con credenciales únicas muestra alerta de registro exitoso', async ({ page }) => {
    // Navegar a demoblaze.com
    await page.goto('https://www.demoblaze.com/');

    // Clic en 'Sign up' del navbar → modal con Username y Password
    await page.getByRole('link', { name: 'Sign up' }).click();
    await expect(page.getByRole('dialog', { name: 'Sign up' })).toBeVisible();

    // Ingresar usuario único (generado dinámicamente) y contraseña válida
    const uniqueUsername = `testuser_${Date.now()}`;
    await page.getByRole('textbox', { name: 'Username:' }).fill(uniqueUsername);
    await page.getByRole('textbox', { name: 'Password:' }).fill('Test1234!');

    // Clic en 'Sign up' → alerta de confirmación de registro exitoso
    const dialogPromise = page.waitForEvent('dialog');
    await page.getByRole('dialog', { name: 'Sign up' }).getByRole('button', { name: 'Sign up' }).click();
    const dialog = await dialogPromise;

    // Verificar que la alerta confirma el registro exitoso
    expect(dialog.message()).toContain('Sign up successful');

    // Aceptar alerta
    await dialog.accept();
  });
});
