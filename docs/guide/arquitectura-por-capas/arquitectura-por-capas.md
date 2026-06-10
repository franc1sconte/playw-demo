## Arquitectura por capas (obligatoria)

El repo arranca como seed (solo `tests/example.spec.ts`). Cuando se agregue cobertura real, las capas se crean directamente en la **raíz del proyecto** (`playw-demo/`), alineado con `testDir: './tests'` de `playwright.config.ts`. No existe ni debe crearse una carpeta `src/` literal — las referencias a `src/` en ejemplos son alias conceptuales de la raíz.

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
