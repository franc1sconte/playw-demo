import { Page, Locator } from '@playwright/test';
import { URLS } from '../../config/urls';

export class SigloDashboardPage {
  private readonly botonNavCursos: Locator;

  constructor(private readonly page: Page) {
    this.botonNavCursos = page.getByRole('button', { name: 'Cursos' });
  }

  async navegarACursos(): Promise<void> {
    await this.page.goto(URLS.siglo.prod.canvasCourses);
  }

  async abrirCursoPorNombre(courseName: string): Promise<void> {
    // Strip combining diacritical marks (U+0300-U+036F) so that accented input
    // like "Introducción" also matches Canvas titles stored without accents
    // like "INTRODUCCION AL DERECHO".
    const diacriticsRegex = new RegExp('[̀-ͯ]', 'gu');
    const normalized = courseName.normalize('NFD').replace(diacriticsRegex, '');
    await this.page.getByRole('link', { name: new RegExp(normalized, 'i') }).click();
  }
}
