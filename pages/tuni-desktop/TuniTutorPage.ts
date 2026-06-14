import { Page, Locator } from '@playwright/test';

export class TuniTutorPage {
  readonly mensajeIntroduccion: Locator;

  constructor(page: Page) {
    this.mensajeIntroduccion = page.locator('p').filter({ hasText: 'Hoy vamos a trabajar' });
  }
}
