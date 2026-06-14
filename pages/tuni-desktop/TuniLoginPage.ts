import { Page, Locator } from '@playwright/test';

export class TuniLoginPage {
  readonly page: Page;
  readonly campoEmail: Locator;
  readonly campoPassword: Locator;
  readonly botonIniciarSesion: Locator;

  constructor(page: Page) {
    this.page = page;
    this.campoEmail = page.getByRole('textbox', { name: 'Correo electrónico' });
    this.campoPassword = page.getByRole('textbox', { name: 'Contraseña' });
    this.botonIniciarSesion = page.getByRole('button', { name: 'Iniciar sesión' });
  }

  async iniciarSesion(email: string, password: string): Promise<void> {
    await this.campoEmail.fill(email);
    await this.campoPassword.fill(password);
    await this.botonIniciarSesion.click();
  }
}
