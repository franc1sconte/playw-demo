import { Page, Locator } from '@playwright/test';

export class SigloLoginPage {
  private readonly campoUsuario: Locator;
  private readonly campoContraseña: Locator;
  private readonly botonIniciarSesion: Locator;

  constructor(private readonly page: Page) {
    this.campoUsuario = page.locator('#pseudonym_session_unique_id');
    this.campoContraseña = page.locator('#pseudonym_session_password');
    this.botonIniciarSesion = page.locator('#login_form input[type="submit"]');
  }

  async iniciarSesion(username: string, password: string): Promise<void> {
    await this.campoUsuario.fill(username);
    await this.campoContraseña.fill(password);
    await this.botonIniciarSesion.click();
  }
}
