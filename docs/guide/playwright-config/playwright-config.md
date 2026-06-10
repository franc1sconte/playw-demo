## Playwright config — notas clave

- `testDir: './tests'`, `fullyParallel: true`, reporter HTML.
- Proyectos activos: `chromium`, `firefox`, `webkit`. Mobile y branded browsers están **comentados** en `playwright.config.ts`.
- **No hay `baseURL` ni `webServer` configurados.** Los tests no deben hardcodear hosts — toman URLs desde `config/` (a través de fixtures). Si se levanta un servidor local, se descomenta y completa el bloque `baseURL` / `webServer`, en lugar de hardcodear en tests.
- `trace: 'on-first-retry'` — los traces se capturan solo en el reintento de un test que falla.
