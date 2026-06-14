import { Page, Locator } from '@playwright/test';

export class TuniHomePage {
  readonly page: Page;
  readonly saludoConNombre: Locator;
  readonly preguntaIntroduccion: Locator;
  readonly header: Locator;
  readonly sideBoard: Locator;

  constructor(page: Page) {
    this.page = page;
    this.saludoConNombre = page.getByRole('heading', { level: 1 });
    this.preguntaIntroduccion = page.getByText('¿Con qué materia comenzamos?');
    this.header = page.getByRole('banner');
    this.sideBoard = page.getByRole('list');
  }

  async navegarAMateriaDesdeSideboard(nombre: string): Promise<void> {
    await this.sideBoard.getByRole('button', { name: new RegExp(nombre) }).first().click();
  }
}
