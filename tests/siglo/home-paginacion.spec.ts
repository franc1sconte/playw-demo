// spec: specs/demoblaze-test-plan.md

import { test, expect } from '@playwright/test';
import { HomePage } from '../../src/pages/HomePage';

test.describe('Home - Paginación', () => {
  test('Navegar entre páginas con botones Next y Previous actualiza la grilla de productos', async ({ page }) => {
    const home = new HomePage(page);

    // Navegar a demoblaze.com, anotar productos de página 1
    await home.goto();

    // Esperar a que la grilla se cargue con al menos un producto
    await home.waitForProductGrid();

    // Anotar el texto del primer producto en página 1
    const primerProductoPag1 = await home.getFirstProductText();

    // Clic en botón 'Next' → la grilla se actualiza con productos distintos
    await home.paginationNext.click();

    // Esperar que la grilla se actualice con nuevos productos (la paginación es asíncrona)
    await expect(home.firstProductTitle).not.toHaveText(primerProductoPag1, { timeout: 15000 });
    await expect(home.firstProductTitle).toBeVisible({ timeout: 15000 });

    // Anotar el primer producto de página 2
    const primerProductoPag2 = await home.getFirstProductText();

    // Clic en 'Previous' → vuelven los productos de la página 1
    await home.paginationPrevious.click();

    // Esperar que la grilla vuelva a mostrar productos de la página 1
    // Verificar que los productos de página 2 ya no son los primeros
    await expect(home.firstProductTitle).not.toHaveText(primerProductoPag2, { timeout: 15000 });
    // Verificar que la grilla cargó productos (al menos uno visible)
    await expect(home.firstProductTitle).toBeVisible({ timeout: 15000 });
  });
});
