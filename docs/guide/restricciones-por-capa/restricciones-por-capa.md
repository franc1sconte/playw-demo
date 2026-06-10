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
