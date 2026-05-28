# CLAUDE.md

Guía para Claude Code (claude.ai/code) trabajando en este repositorio: un proyecto Playwright + TypeScript con **arquitectura por capas obligatoria** operada por un conjunto de **agentes especializados**.

> Este documento es la **fuente de verdad arquitectónica** del proyecto. Antes de generar código no trivial, leélo completo. Las reglas vinculantes para cada capa y agente viven acá.


---

## Naming conventions

- Page Objects: PascalCase (`LoginPage.ts`)
- Specs: kebab-case (`login.spec.ts`)
- Fixtures: `<feature>.fixture.ts`
- Factories: `<entity>Factory.ts`
- Data: `<entity>-Data.json`

---

## Arquitectura por capas (obligatoria)

El repo arranca como seed (solo `tests/example.spec.ts`). Cuando se agregue cobertura real, las capas se crean bajo `src/` (o en la raíz del proyecto, alineado con `testDir` de `playwright.config.ts`).

Responsabilidad única por archivo (SRP). Cada capa hace **una sola cosa**:

| Capa | Hace | No hace |
|---|---|---|
| **tests/** | Describe escenarios, ejecuta acciones, corre assertions. | Locators, CSS/XPath, requests HTTP, instanciar Pages manual, hardcodear URLs/credenciales/datos. |
| **fixtures/** | Prepara contexto, inyecta dependencias (Pages, Api, datos) al test. | Lógica de negocio, assertions, datos estáticos del negocio, flujos funcionales completos. |
| **pages/** | Encapsula UI: locators e interacciones. | Assertions, llamadas API, leer env vars, generar datos. |
| **factories/** | Genera datos dinámicos y payloads tipados. | UI, assertions, llamadas API, locators, acciones Playwright. |
| **api/** | Encapsula llamadas a servicios externos. | Locators, UI, assertions, conocer detalles visuales. |
| **data/** | JSON estático de negocio reutilizable. | Secretos, credenciales reales, lógica, funciones. |
| **config/** | URLs, ambientes, credenciales (placeholders / env), variables globales. | Lógica de negocio, locators, acciones UI, assertions, datos de casos específicos. |

### Regla de oro (SRP)

Cada archivo, una sola responsabilidad. **Si una unidad necesita UI + API, se divide en `Page` + `Api` y la orquestación vive en una fixture o inline en el test.** Nunca mezclar capas en un mismo archivo.

---

## Ejemplo de directorios

src/
├── tests/
│   └── home
│        └── home.spec.ts     
│
├── fixtures/
│   ├── auth.fixture.ts
│   ├── pages.fixture.ts
│   └── api.fixture.ts
│
├── pages/
│   ├── LoginPage.ts
│   ├── RegistroPage.ts
│   └── CursoPage.ts
│
├── factories/
│   ├── UserFactory.ts
│   ├── CursoFactory.ts
│   └── FacturaFactory.ts
│
├── api/
│   ├── UserApi.ts
│   └── CursoApi.ts
│
├── data/
│   ├── usuarios.json
│   └── cursos.json
│
├── config/
│   ├── credentials.ts
│   ├── environments.ts
│   └── urls.ts


## Directorios REALES para test (para la creacion de archivos para specs y folders, usar esta arquitectura)

tests/
├── siglo/
├── uni-desktop/
│   ├── .gitkeep
│   ├── home.spec.js
│   └── tutor.spec.js
└── tuni-mobile/

---

## Restricciones obligatorias por capa

Lista que cada agente y el orquestador deben consultar antes de modificar código.

**PROHIBIDO EN TESTS**
- Declarar locators
- Utilizar selectores CSS/XPath
- Realizar requests HTTP directos
- Crear Page Objects manualmente
- Hardcodear credenciales
- Hardcodear URLs
- Duplicar datos reutilizables

**PROHIBIDO EN PAGES**
- Realizar assertions
- Consumir APIs
- Leer variables de entorno
- Generar datos de prueba

**PROHIBIDO EN FACTORIES**
- Interactuar con UI
- Realizar assertions
- Consumir APIs
- Acceder a locators
- Ejecutar acciones Playwright

**PROHIBIDO EN API**
- Utilizar locators
- Interactuar con UI
- Ejecutar assertions
- Conocer detalles visuales de la aplicación

**PROHIBIDO EN FIXTURES**
- Contener lógica de negocio
- Realizar assertions
- Implementar flujos funcionales completos
- Almacenar datos estáticos del negocio

**PROHIBIDO EN DATA**
- Almacenar secretos
- Almacenar credenciales reales
- Ejecutar lógica
- Contener funciones

**PROHIBIDO EN CONFIG**
- Contener lógica de negocio
- Contener locators
- Contener acciones UI
- Contener assertions
- Contener datos específicos de casos de prueba

---

## Arquitectura multi-agente

Cada capa tiene **un agente especializado** que internaliza sus prohibiciones y solo modifica archivos de su carpeta. Claude principal actúa como **orquestador**: divide el trabajo, delega a los agentes correctos y coordina dependencias entre capas.


### Regla de orquestación (Claude principal)

1. **Detectar capas afectadas** por el pedido y mapearlas a sus agentes.
2. **Resolver dependencias entre capas** y planificar el orden:
   - Independientes → delegar **en paralelo** (un único mensaje con varios `Agent`).
   - Dependientes (una capa necesita el contrato de otra) → **secuencial**.
3. **Flujo típico para automatizar un test case**: el input es siempre un test case descriptivo. Desde ahí: crear/actualizar Page Objects con los selectores de la UI (`pages/`), escribir el spec (`tests/`), e incorporar capas auxiliares (`data`, `factories`, `fixtures`, `api`, `config`) sólo cuando el spec las necesita.
4. **Cada agente solo edita su carpeta.** Si un agente detecta que necesita cambios en otra capa, devuelve al orquestador el **contrato sugerido** (firma esperada, datos requeridos, etc.) — no toca la otra capa.
5. **Prohibido para el orquestador**: editar directamente archivos de una capa cuando existe su agente. El orquestador coordina; los agentes ejecutan.

### Antipatrones a rechazar

- Un agente escribiendo en una carpeta que no es la suya.
- Tests que importan locators o llaman a `request` directamente — derivar a `page-object-author` / `api-client-author`.
- Factories que llaman a Playwright o leen archivos — pasar lo estático a `test-data-manager`, lo dinámico se queda en factories.

---

### Registro de agentes especializados (SCP)

| Agente | Scope — carpetas que puede tocar | Capabilities — qué hace | Prohibitions — qué nunca hace |
|---|---|---|---|
| **playwright-test-planner** | `specs/` (escritura), `tests/` (solo lectura), `resources/` (solo lectura) | Explorar la UI en el browser, mapear flujos, diseñar escenarios, guardar planes en `specs/` vía `planner_save_plan` | Escribir specs (`.spec.ts`), modificar Page Objects, editar archivos de código, hardcodear datos o URLs |
| **playwright-test-generator** | `tests/<suite>/` (escritura de specs), `src/pages/` (lectura para verificar locators existentes) | Navegar la UI en tiempo real, ejecutar pasos del plan, escribir specs TypeScript vía `generator_write_test` respetando la arquitectura por capas | Declarar locators dentro del spec, hardcodear URLs o credenciales, crear Page Objects desde cero (si no existen, reportar contrato al orquestador), mezclar capas en un mismo archivo |
| **playwright-test-healer** | `tests/<suite>/` (edición de specs), `src/pages/` (edición de Page Objects) | Ejecutar tests fallidos, inspeccionar snapshots y consola, corregir selectores/assertions, actualizar Page Objects cuando cambia la UI | Mover lógica de negocio a tests, inlinear locators dentro de specs (la corrección va en `pages/`), hardcodear datos dinámicos, mezclar capas como solución rápida |

> **Regla de activación para el orquestador:** ante cualquier pedido de test automation, el orden es siempre `planner → generator → healer` (si hay fallos). El orquestador nunca invoca al generador sin un plan previo, ni al healer sin haber corrido los tests primero.

---

## Playwright config — notas clave

- `testDir: './tests'`, `fullyParallel: true`, reporter HTML.
- Proyectos activos: `chromium`, `firefox`, `webkit`. Mobile y branded browsers están **comentados** en `playwright.config.ts`.
- **No hay `baseURL` ni `webServer` configurados.** Los tests no deben hardcodear hosts — toman URLs desde `config/` (a través de fixtures). Si se levanta un servidor local, se descomenta y completa el bloque `baseURL` / `webServer`, en lugar de hardcodear en tests.
- `trace: 'on-first-retry'` — los traces se capturan solo en el reintento de un test que falla.

---

## Convenciones transversales

- **TypeScript** (`.ts`) en todo el código nuevo.
- Idioma de los títulos de tests y mensajes: mantener el tono del suite existente (si está en español, seguir en español).
- **Nunca commitear `test.only`**. CI lo bloquea con `forbidOnly`.
- Evitar `page.waitForTimeout` para sincronización. Usar **web-first assertions** (`toBeVisible`, `toHaveText`, `toHaveURL`, etc.).
- Tests cross-browser por defecto. Si un test es browser-específico, gatearlo con `test.skip(browserName !== 'chromium', '...')` y documentarlo.
- Al correr una suite específica indicar `--project=` cuando aplica.
