import { Page, Locator } from '@playwright/test';

export class SigloTuniWidgetPage {
  private readonly contenedorWidget: Locator;
  private readonly botonAlternarWidget: Locator;
  private readonly botonIrATuniHeader: Locator;
  private readonly botonPermisosAuth: Locator;
  private readonly inputChat: Locator;
  private readonly botonEnviarMensaje: Locator;
  private readonly areaScrollChat: Locator;
  private readonly tituloModalAuth: Locator;

  constructor(private readonly page: Page) {
    this.contenedorWidget = page.locator('button.tuni-float-btn');
    this.botonAlternarWidget = page.getByRole('button', { name: 'Abrir chat' });
    this.botonIrATuniHeader = page.getByRole('button', { name: 'Ir a TUNI →' });
    this.botonPermisosAuth = page.getByRole('button', { name: 'Continuar' });
    this.inputChat = page.getByRole('textbox', { name: 'Escribí tu consulta...' });
    this.botonEnviarMensaje = page.getByRole('button', { name: 'Enviar mensaje' });
    this.areaScrollChat = page.locator('.tuni-scroll');
    this.tituloModalAuth = page.getByText('Para empezar, necesito tu autorización');
  }

  async esWidgetVisible(): Promise<boolean> {
    return this.contenedorWidget.waitFor({ state: 'visible', timeout: 10000 })
      .then(() => true)
      .catch(() => false);
  }

  async abrirWidget(): Promise<void> {
    await this.botonAlternarWidget.click();
  }

  async irATuniDesdeHeader(): Promise<void> {
    await this.botonIrATuniHeader.click();
  }

  async aceptarPermisosAuthSiPresente(): Promise<void> {
    const isVisible = await this.botonPermisosAuth.isVisible({ timeout: 3000 }).catch(() => false);
    if (isVisible) {
      await this.botonPermisosAuth.click();
    }
  }

  async validarModalAuth(): Promise<void> {
    await this.tituloModalAuth.waitFor({ state: 'visible', timeout: 10000 });
  }

  async continuarAuth(): Promise<void> {
    await this.botonPermisosAuth.click();
  }

  async enviarMensajeChat(mensaje: string): Promise<void> {
    await this.inputChat.fill(mensaje);
    await this.botonEnviarMensaje.click();
  }

  async obtenerUltimaRespuestaChat(): Promise<string> {
    // Mensajes del bot identificados por align-self: center en el style inline del DOM del widget.
    // Primero espera a que aparezca al menos un mensaje del bot.
    const mensajesBot = this.areaScrollChat.locator('div[style*="align-self: center"]');
    await mensajesBot.last().waitFor({ state: 'visible', timeout: 30000 });

    // Luego espera a que el indicador de escritura "Escribiendo..." desaparezca del último mensaje,
    // lo que indica que el bot terminó de generar la respuesta completa.
    await this.page.waitForFunction(
      () => {
        const scrollArea = document.querySelector('.tuni-scroll');
        if (!scrollArea) return false;
        const botMessages = scrollArea.querySelectorAll('div[style*="align-self: center"]');
        if (!botMessages.length) return false;
        const lastMessage = botMessages[botMessages.length - 1];
        const text = lastMessage.textContent?.trim() ?? '';
        return text.length > 0 && text !== 'Escribiendo...';
      },
      { timeout: 60000 }
    );

    return await mensajesBot.last().innerText();
  }

  async esperarBotonEnChat(texto: string): Promise<void> {
    const boton = this.areaScrollChat.getByRole('button', { name: texto }).last();
    await boton.waitFor({ state: 'visible', timeout: 15000 });
  }

  async clickearBotonEnChat(texto: string): Promise<void> {
    const boton = this.areaScrollChat.getByRole('button', { name: texto }).last();
    await boton.waitFor({ state: 'visible', timeout: 15000 });
    await boton.click();
  }
}
