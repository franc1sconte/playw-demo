// spec: TC-SIGLO-001, TC-SIGLO-002, TC-SIGLO-003, TC-SIGLO-004, TC-SIGLO-005
// seed: tests/siglo/siglo-widget.spec.ts

import { test, expect } from '../../fixtures/siglo.fixture';
import sigloData from '../../data/siglo-Data.json';
import { URLS } from '../../config/urls';

test.describe('Redirección a TUNI desde el widget', () => {
  test('TC-SIGLO-001 - Redirect a TUNI via button header widget - Introducción al Derecho', async ({ page, dashboardPage, tuniWidget }) => {
    // 1. Navegar a la lista de cursos desde el sidebar
    await dashboardPage.navegarACursos();

    // 2. Abrir el curso "Introducción al Derecho"
    await dashboardPage.abrirCursoPorNombre(sigloData.courses.introductionToLaw.name);

    // 3. Confirmar que el widget "Estudiar con TUNI" es visible
    await expect(await tuniWidget.esWidgetVisible()).toBeTruthy();

    // 4. Abrir el widget si está colapsado
    await tuniWidget.abrirWidget();

    // 5. Clickear "Ir a TUNI" en el header → aparece modal de autorización (siempre)
    await tuniWidget.irATuniDesdeHeader();

    // 6. Con TUNI autenticado (storageState del global setup), "Continuar" abre
    //    directamente siglo21.educabot.com/courses sin el intermediario OAuth.
    const [popup] = await Promise.all([
      page.waitForEvent('popup'),
      tuniWidget.aceptarPermisosAuthSiPresente(),
    ]);

    // 7. Verificar que la URL final del popup es https://siglo21.educabot.com/courses
    await expect(popup).toHaveURL(URLS.siglo.prod.courses);
  });

  test('TC-SIGLO-002 - Redirect a TUNI via button header widget - Derecho Constitucional', async ({ page, dashboardPage, tuniWidget }) => {
    // 1. Navegar a la lista de cursos desde el sidebar
    await dashboardPage.navegarACursos();

    // 2. Abrir el curso "Derecho Constitucional"
    await dashboardPage.abrirCursoPorNombre(sigloData.courses.constitutionalLaw.name);

    // 3. Confirmar que el widget "Estudiar con TUNI" es visible
    await expect(await tuniWidget.esWidgetVisible()).toBeTruthy();

    // 4. Abrir el widget
    await tuniWidget.abrirWidget();

    // 5. Clickear "Ir a TUNI" en el header
    await tuniWidget.irATuniDesdeHeader();

    // 6. Esperar popup y aceptar permisos auth si están presentes
    const [popup] = await Promise.all([
      page.waitForEvent('popup'),
      tuniWidget.aceptarPermisosAuthSiPresente(),
    ]);

    // 7. Verificar que la URL final del popup es https://siglo21.educabot.com/courses
    await expect(popup).toHaveURL(URLS.siglo.prod.courses);
  });
});

test.describe('Flujo de autorización OAuth hacia TUNI', () => {
  test.use({ storageState: { cookies: [], origins: [] } });

  test('TC-SIGLO-003 - Auth E2E Canvas→TUNI desde widget header - Introducción al Derecho', async ({ page, context, dashboardPage, tuniWidget }) => {
    // 1. Navegar a la lista de cursos y abrir "Introducción al Derecho"
    await dashboardPage.navegarACursos();
    await dashboardPage.abrirCursoPorNombre(sigloData.courses.introductionToLaw.name);

    // 2. Confirmar que el widget es visible y abrirlo
    await expect(await tuniWidget.esWidgetVisible()).toBeTruthy();
    await tuniWidget.abrirWidget();

    // 3. Clickear "Ir a TUNI" en el header
    await tuniWidget.irATuniDesdeHeader();

    // 4. Validar que el modal de autorización es visible con su título
    await tuniWidget.validarModalAuth();

    // 5. Clickear "Continuar" → se abre el popup OAuth de Canvas
    const [oauthPopup] = await Promise.all([
      page.waitForEvent('popup'),
      tuniWidget.continuarAuth(),
    ]);

    // 6. Validar que la URL del popup corresponde a la confirmación OAuth de Canvas
    await expect(oauthPopup).toHaveURL(/login\/oauth2\/confirm/);

    // 7. Validar que el botón "Autorizar" es visible en el popup
    const botonAutorizar = oauthPopup.getByRole('button', { name: /Autorizar|Authorize/i });
    await expect(botonAutorizar).toBeVisible();

    // 8. Capturar la nueva pestaña TUNI antes de clickear "Autorizar"
    const tuniPagePromise = context.waitForEvent('page');
    await botonAutorizar.click();
    const tuniPage = await tuniPagePromise;

    // 9. Validar que la URL final de TUNI es la correcta → auth completado con éxito
    await tuniPage.waitForLoadState('domcontentloaded');
    await expect(tuniPage).toHaveURL(URLS.siglo.prod.courses);
  });

  test('TC-SIGLO-004 - Auth E2E Canvas→TUNI desde widget header - Derecho Constitucional', async ({ page, context, dashboardPage, tuniWidget }) => {
    // 1. Navegar a la lista de cursos y abrir "Derecho Constitucional"
    await dashboardPage.navegarACursos();
    await dashboardPage.abrirCursoPorNombre(sigloData.courses.constitutionalLaw.name);

    // 2. Confirmar que el widget es visible y abrirlo
    await expect(await tuniWidget.esWidgetVisible()).toBeTruthy();
    await tuniWidget.abrirWidget();

    // 3. Clickear "Ir a TUNI" en el header
    await tuniWidget.irATuniDesdeHeader();

    // 4. Validar que el modal de autorización es visible con su título
    await tuniWidget.validarModalAuth();

    // 5. Clickear "Continuar" → se abre el popup OAuth de Canvas
    const [oauthPopup] = await Promise.all([
      page.waitForEvent('popup'),
      tuniWidget.continuarAuth(),
    ]);

    // 6. Validar que la URL del popup corresponde a la confirmación OAuth de Canvas
    await expect(oauthPopup).toHaveURL(/login\/oauth2\/confirm/);

    // 7. Validar que el botón "Autorizar" es visible en el popup
    const botonAutorizar = oauthPopup.getByRole('button', { name: /Autorizar|Authorize/i });
    await expect(botonAutorizar).toBeVisible();

    // 8. Capturar la nueva pestaña TUNI antes de clickear "Autorizar"
    const tuniPagePromise = context.waitForEvent('page');
    await botonAutorizar.click();
    const tuniPage = await tuniPagePromise;

    // 9. Validar que la URL final de TUNI es la correcta → auth completado con éxito
    await tuniPage.waitForLoadState('domcontentloaded');
    await expect(tuniPage).toHaveURL(URLS.siglo.prod.courses);
  });
});

test.describe('Redirección a TUNI vía conversación en el chat', () => {
  test('TC-SIGLO-005 - Redirect a TUNI via conversación en el chat - Introducción al Derecho', async ({ page, dashboardPage, tuniWidget }) => {
    // 1. Navegar a la lista de cursos desde el sidebar
    await dashboardPage.navegarACursos();

    // 2. Abrir el curso "Introducción al Derecho"
    await dashboardPage.abrirCursoPorNombre(sigloData.courses.introductionToLaw.name);

    // 3. Confirmar que el widget "Estudiar con TUNI" es visible
    expect(await tuniWidget.esWidgetVisible()).toBeTruthy();

    // 4. Abrir el widget
    await tuniWidget.abrirWidget();

    // 5. Enviar mensaje "En que materia estamos?"
    await tuniWidget.enviarMensajeChat(sigloData.chatMessages.enQueMateria);

    // 6. Leer la última respuesta del chatbot
    const respuesta = await tuniWidget.obtenerUltimaRespuestaChat();

    // 7. Validar que la respuesta menciona "Introducción al Derecho"
    expect(respuesta).toContain(sigloData.courses.introductionToLaw.name);

    // 8. Enviar mensaje "Vamos a TUNI?"
    await tuniWidget.enviarMensajeChat(sigloData.chatMessages.vamosATuniPregunta);

    // 9. Validar que aparecen los botones "Ahora no" y "Continuar" en el chat
    await tuniWidget.esperarBotonEnChat('Ahora no');

    // 10. Clickear "Ir a TUNI" capturando el popup
    const [popup] = await Promise.all([
      page.waitForEvent('popup'),
      tuniWidget.clickearBotonEnChat('Ir a TUNI'),
    ]);

    // 11. Validar que la URL del popup corresponde al tutor de TUNI
    await expect(popup).toHaveURL(new RegExp(URLS.siglo.prod.tutorBase));

    // 12. Esperar que el popup cargue completamente
    await popup.waitForLoadState('domcontentloaded');

    // 13. Validar que el mensaje de intro de la clase es visible en el popup
    await expect(popup.getByText(sigloData.courses.introductionToLaw.expectedIntroMessage)).toBeVisible();
  });

  test('TC-SIGLO-006 - Redirect a TUNI via conversación en el chat - Derecho Constitucional', async ({ page, dashboardPage, tuniWidget }) => {
    // 1. Navegar a la lista de cursos desde el sidebar
    await dashboardPage.navegarACursos();

    // 2. Abrir el curso "Derecho Constitucional"
    await dashboardPage.abrirCursoPorNombre(sigloData.courses.constitutionalLaw.name);

    // 3. Confirmar que el widget "Estudiar con TUNI" es visible
    expect(await tuniWidget.esWidgetVisible()).toBeTruthy();

    // 4. Abrir el widget
    await tuniWidget.abrirWidget();

    // 5. Enviar mensaje "En que materia estamos?"
    await tuniWidget.enviarMensajeChat(sigloData.chatMessages.enQueMateria);

    // 6. Leer la última respuesta del chatbot
    const respuesta = await tuniWidget.obtenerUltimaRespuestaChat();

    // 7. Validar que la respuesta menciona "Derecho Constitucional"
    expect(respuesta).toContain(sigloData.courses.constitutionalLaw.name);

    // 8. Enviar mensaje "Vamos a TUNI?"
    await tuniWidget.enviarMensajeChat(sigloData.chatMessages.vamosATuniPregunta);

    // 9. Validar que aparecen los botones "Ahora no" y "Continuar" en el chat
    await tuniWidget.esperarBotonEnChat('Ahora no');

    // 10. Clickear "Ir a TUNI" capturando el popup
    const [popup] = await Promise.all([
      page.waitForEvent('popup'),
      tuniWidget.clickearBotonEnChat('Ir a TUNI'),
    ]);

    // 11. Validar que la URL del popup corresponde al tutor de TUNI
    await expect(popup).toHaveURL(new RegExp(URLS.siglo.prod.tutorBase));

    // 12. Esperar que el popup cargue completamente
    await popup.waitForLoadState('domcontentloaded');

    // 13. Validar que el mensaje de intro de la clase es visible en el popup
    await expect(popup.getByText(sigloData.courses.constitutionalLaw.expectedIntroMessage)).toBeVisible();
  });
});
