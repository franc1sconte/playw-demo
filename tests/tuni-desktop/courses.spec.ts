import { test, expect } from '../../fixtures/tuni-desktop.fixture';
import tuniData from '../../data/tuni-Data.json';

test.describe('Courses', () => {
  test('TC-COURSES-001 - Validar visibilidad de componentes - Introducción al Derecho', async ({ page, homePage, courseDetailPage }) => {
    // 1. Hacer click en la materia desde el sideboard
    await homePage.navegarAMateriaDesdeSideboard(tuniData.courses.introductionToLaw.name);

    // 2. Validar que la URL cambió a /courses/{id}
    await expect(page).toHaveURL(/\/courses\/[a-z0-9-]+/);

    // 3. Validar visibilidad de los 4 bloques
    await expect(courseDetailPage.nombreMateria).toBeVisible();
    await expect(courseDetailPage.claseRecomendada).toBeVisible();
    await expect(courseDetailPage.contenidos).toBeVisible();
    await expect(courseDetailPage.progresoMateria).toBeVisible();
  });

  test('TC-COURSES-005 - Validar visibilidad de componentes - Derecho Constitucional', async ({ page, homePage, courseDetailPage }) => {
    // 1. Hacer click en la materia desde el sideboard
    await homePage.navegarAMateriaDesdeSideboard(tuniData.courses.constitutionalLaw.name);

    // 2. Validar que la URL cambió a /courses/{id}
    await expect(page).toHaveURL(/\/courses\/[a-z0-9-]+/);

    // 3. Validar visibilidad de los 4 bloques
    await expect(courseDetailPage.nombreMateria).toBeVisible();
    await expect(courseDetailPage.claseRecomendada).toBeVisible();
    await expect(courseDetailPage.contenidos).toBeVisible();
    await expect(courseDetailPage.progresoMateria).toBeVisible();
  });

  test('TC-COURSES-002 - Validar componente "Clase recomendada" - Introducción al Derecho', async ({ page, homePage, courseDetailPage, tutorPage }) => {
    // 1. Navegar a la materia desde el sideboard
    await homePage.navegarAMateriaDesdeSideboard(tuniData.courses.introductionToLaw.name);
    await expect(page).toHaveURL(/\/courses\/[a-z0-9-]+/);

    // 2. Expandir Módulo 0 y guardar el nombre de la primera unidad
    await courseDetailPage.abrirModulo0();
    const nombrePrimeraUnidad = await courseDetailPage.obtenerNombrePrimeraUnidad();

    // 3. Clickear "Empezar a estudiar" y validar navegación al tutor
    await courseDetailPage.clickEmpezarAEstudiar();
    await expect(page).toHaveURL(/\/tutor\//);

    // 4. Validar que el mensaje de introducción menciona la primera unidad del Módulo 0
    await expect(tutorPage.mensajeIntroduccion).toContainText(nombrePrimeraUnidad);
  });

  test('TC-COURSES-006 - Validar componente "Clase recomendada" - Derecho Constitucional', async ({ page, homePage, courseDetailPage, tutorPage }) => {
    // 1. Navegar a la materia desde el sideboard
    await homePage.navegarAMateriaDesdeSideboard(tuniData.courses.constitutionalLaw.name);
    await expect(page).toHaveURL(/\/courses\/[a-z0-9-]+/);

    // 2. Expandir Módulo 0 y guardar el nombre de la primera unidad
    await courseDetailPage.abrirModulo0();
    const nombrePrimeraUnidad = await courseDetailPage.obtenerNombrePrimeraUnidad();

    // 3. Clickear "Empezar a estudiar" y validar navegación al tutor
    await courseDetailPage.clickEmpezarAEstudiar();
    await expect(page).toHaveURL(/\/tutor\//);

    // 4. Validar que el mensaje de introducción menciona la primera unidad del Módulo 0
    await expect(tutorPage.mensajeIntroduccion).toContainText(nombrePrimeraUnidad);
  });
});
