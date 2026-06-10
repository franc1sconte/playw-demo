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
| **playwright-test-generator** | `tests/<suite>/` (escritura de specs), `pages/` (lectura para verificar locators existentes) | Navegar la UI en tiempo real, ejecutar pasos del plan, escribir specs TypeScript vía `generator_write_test` respetando la arquitectura por capas | Declarar locators dentro del spec, hardcodear URLs o credenciales, crear Page Objects desde cero (si no existen, reportar contrato al orquestador), mezclar capas en un mismo archivo |
| **playwright-test-healer** | `tests/<suite>/` (edición de specs), `pages/` (edición de Page Objects) | Ejecutar tests fallidos, inspeccionar snapshots y consola, corregir selectores/assertions, actualizar Page Objects cuando cambia la UI | Mover lógica de negocio a tests, inlinear locators dentro de specs (la corrección va en `pages/`), hardcodear datos dinámicos, mezclar capas como solución rápida |

> **Regla de activación para el orquestador:** ante cualquier pedido de test automation, el orden es siempre `planner → generator → healer` (si hay fallos). El orquestador nunca invoca al generador sin un plan previo, ni al healer sin haber corrido los tests primero.
