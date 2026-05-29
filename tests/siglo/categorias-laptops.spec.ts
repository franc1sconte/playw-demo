// spec: specs/demoblaze-test-plan.md

import { test, expect } from '@playwright/test';

test.describe('Categorías - Laptops y Monitors', () => {
  test('Al filtrar por Laptops solo se muestran laptops y al filtrar por Monitors solo monitores', async ({ page }) => {
    // Navegar a demoblaze.com
    await page.goto('https://www.demoblaze.com/');

    // Esperar a que la grilla esté cargada
    await expect(page.locator('.card-title a').first()).toBeVisible();

    // Clic en 'Laptops' → solo se muestran laptops
    await page.getByRole('link', { name: 'Laptops' }).click();

    // Verificar laptops visibles
    await expect(page.getByRole('heading', { name: 'Sony vaio i5' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'MacBook air' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Dell i7 8gb' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'MacBook Pro' })).toBeVisible();

    // Verificar que no aparecen teléfonos ni monitores
    await expect(page.getByRole('heading', { name: 'Samsung galaxy s6' })).not.toBeVisible();
    await expect(page.getByRole('heading', { name: 'Apple monitor 24' })).not.toBeVisible();

    // Clic en 'Monitors' → solo se muestran monitores
    await page.getByRole('link', { name: 'Monitors' }).click();

    // Verificar monitores visibles
    await expect(page.getByRole('heading', { name: 'Apple monitor 24' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'ASUS Full HD' })).toBeVisible();

    // Verificar que no aparecen laptops ni teléfonos
    await expect(page.getByRole('heading', { name: 'Sony vaio i5' })).not.toBeVisible();
    await expect(page.getByRole('heading', { name: 'Samsung galaxy s6' })).not.toBeVisible();
  });
});
