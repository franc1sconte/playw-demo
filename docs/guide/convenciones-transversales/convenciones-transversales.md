## Convenciones transversales

- **TypeScript** (`.ts`) en todo el código nuevo.
- Idioma de los títulos de tests y mensajes: mantener el tono del suite existente (si está en español, seguir en español).
- **Nunca commitear `test.only`**. CI lo bloquea con `forbidOnly`.
- Evitar `page.waitForTimeout` para sincronización. Usar **web-first assertions** (`toBeVisible`, `toHaveText`, `toHaveURL`, etc.).
- Tests cross-browser por defecto. Si un test es browser-específico, gatearlo con `test.skip(browserName !== 'chromium', '...')` y documentarlo.
- Al correr una suite específica indicar `--project=` cuando aplica.
