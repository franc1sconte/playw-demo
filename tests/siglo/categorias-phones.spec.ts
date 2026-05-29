// spec: specs/demoblaze-test-plan.md

import { test, expect } from '@playwright/test';

test.describe('Categorías - Phones', () => {
  test('Al filtrar por Phones solo se muestran teléfonos en la grilla', async ({ page }) => {
    // Navegar a demoblaze.com
    await page.goto('https://www.demoblaze.com/');

    // Esperar a que la grilla esté cargada
    await expect(page.locator('.card-title a').first()).toBeVisible();

    // Clic en categoría 'Phones'
    await page.getByRole('link', { name: 'Phones' }).click();

    // Esperar a que la grilla se actualice mostrando teléfonos
    await expect(page.getByRole('heading', { name: 'Samsung galaxy s6' })).toBeVisible();

    // Verificar que solo se muestran teléfonos conocidos
    await expect(page.getByRole('heading', { name: 'Nokia lumia 1520' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Nexus 6' })).toBeVisible();

    // Verificar que no aparecen laptops ni monitores
    await expect(page.getByRole('heading', { name: 'Sony vaio i5' })).not.toBeVisible();
    await expect(page.getByRole('heading', { name: 'Apple monitor 24' })).not.toBeVisible();
  });
});
