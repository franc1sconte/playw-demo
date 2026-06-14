import { Page, Locator } from '@playwright/test';

export class TuniCourseDetailPage {
  private readonly page: Page;
  readonly nombreMateria: Locator;
  readonly claseRecomendada: Locator;
  readonly contenidos: Locator;
  readonly progresoMateria: Locator;
  readonly botonEmpezarAEstudiar: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nombreMateria = page.getByRole('main').getByRole('heading', { level: 1 });
    this.claseRecomendada = page.getByRole('heading', { name: 'Clase recomendada' });
    this.contenidos = page.getByRole('heading', { name: 'Contenidos' });
    this.progresoMateria = page.getByRole('heading', { name: 'Progreso de la materia' });
    this.botonEmpezarAEstudiar = page.getByRole('button', { name: 'Empezar a estudiar' });
  }

  async abrirModulo0(): Promise<void> {
    await this.page.getByText('Módulo 0.', { exact: true }).locator('xpath=ancestor::article[1]').click();
  }

  async obtenerNombrePrimeraUnidad(): Promise<string> {
    const primerBotonEstudiar = this.page.getByRole('button', { name: 'Estudiar', exact: true }).first();
    await primerBotonEstudiar.waitFor({ state: 'visible' });
    return (await primerBotonEstudiar.locator('xpath=preceding-sibling::*[1]').innerText()).trim();
  }

  async clickEmpezarAEstudiar(): Promise<void> {
    await this.botonEmpezarAEstudiar.click();
  }
}
