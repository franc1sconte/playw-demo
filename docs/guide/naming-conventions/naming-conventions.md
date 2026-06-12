## Naming conventions

- Page Objects: PascalCase (`LoginPage.ts`)
- Specs: kebab-case, nombrar por **feature/componente** — nunca por acción específica ni por TC ID.
  - ✅ `siglo-widget.spec.ts` (feature)
  - ❌ `redireccion-header.spec.ts` (acción específica)
  - ❌ `tc-siglo-001.spec.ts` (ID de caso)
  - Un archivo de spec puede contener múltiples test cases del mismo feature.
- Fixtures: `<feature>.fixture.ts`
- Factories: `<entity>Factory.ts`
- Data: `<entity>-Data.json`

### Idioma de los nombres

- **Propiedades y métodos de Page Objects (`pages/`):** español, camelCase.
  - ✅ `botonIrATuni`, `campoUsuario`, `abrirWidget()`
  - ❌ `goToTuniButton`, `usernameInput`, `openWidget()`
- **Títulos de `test()` y `test.describe()`:** español (mantener el idioma del plan).
- **Nombres de archivo** (specs, fixtures, factories, data): kebab-case en español.
  - ✅ `siglo-widget.spec.ts`, `inicio-sesion.fixture.ts`
