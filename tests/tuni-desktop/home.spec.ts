import { test, expect } from '../../fixtures/tuni-desktop.fixture';
import { URLS } from '../../config/urls';

test.describe('Home', () => {
  test('TC-HOME-001 - Validar visibilidad de Saludo + Nombre + pregunta de introducción', async ({ page, homePage }) => {
    await expect(page).toHaveURL(URLS.tuni.staging.courses);
    // Falla intencionalmente: la cuenta no tiene nombre asignado (bug conocido)
    await expect(homePage.saludoConNombre).toHaveText(/¡Hola, \S+!/);
    await expect(homePage.preguntaIntroduccion).toBeVisible();
  });

  test('TC-HOME-003 - Visibilidad de los componentes de header y sideboard', async ({ homePage }) => {
    await expect(homePage.header).toBeVisible();
    await expect(homePage.sideBoard).toBeVisible();
  });
});
