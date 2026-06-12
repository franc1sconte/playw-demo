## Convenciones transversales

### Estructura de specs

**`test.describe`** — nombre genérico del grupo funcional. Nunca incluir TC ID.
- ✅ `'Redirección a TUNI desde el widget'`
- ❌ `'TC-SIGLO-001 — Redirección a TUNI desde botón "Ir a TUNI" del header'`

**`test()`** — formato: `'[TC-ID] - [título de acción corto]'`. El título es un nombre de escenario, no una sentencia de validación.
- ✅ `'TC-SIGLO-001 - Redirect a TUNI via button header widget'`
- ❌ `'debe redirigir a siglo21.educabot.com/courses al clickear ...'`

- **TypeScript** (`.ts`) en todo el código nuevo.
- Idioma de los títulos de tests y mensajes: mantener el tono del suite existente (si está en español, seguir en español).
- **Nunca commitear `test.only`**. CI lo bloquea con `forbidOnly`.
- Evitar `page.waitForTimeout` para sincronización. Usar **web-first assertions** (`toBeVisible`, `toHaveText`, `toHaveURL`, etc.).
- Tests cross-browser por defecto. Si un test es browser-específico, gatearlo con `test.skip(browserName !== 'chromium', '...')` y documentarlo.
- Al correr una suite específica indicar `--project=` cuando aplica.
