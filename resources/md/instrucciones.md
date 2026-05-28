# Arquitectura en CAPAS para el proyecto de playwright

## Ejemplo de directorios
src/

├── tests/
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


## Regla de Oro para la Skill

Tests:
  describen escenarios
  ejecutan acciones
  realizan assertions

Fixtures:
  preparan contexto
  inyectan dependencias
  exponen recursos reutilizables al test

Pages:
  representan la interfaz de usuario
  encapsulan locators
  encapsulan interacciones y comportamientos de la UI

Factories:
  generan datos dinámicos para pruebas
  crean entidades y payloads de forma reutilizable

Api:
  encapsula la comunicación con servicios externos
  abstrae endpoints y requests

Types:
  definen contratos, modelos e interfaces
  tipan datos de negocio y respuestas

Data:
  almacena datos estáticos reutilizables
  contiene información funcional del negocio

Config:
  centraliza configuración del framework
  administra URLs, ambientes, credenciales y variables globales

Helpers:
  orquestan flujos reutilizables
  combinan múltiples capas cuando es necesario

Utils:
  contienen funciones genéricas independientes del negocio

## Restricciones Arquitectónicas Obligatorias

PROHIBIDO EN TESTS

- Declarar locators
- Utilizar selectores CSS/XPath
- Realizar requests HTTP directos
- Crear Page Objects manualmente
- Hardcodear credenciales
- Hardcodear URLs
- Duplicar datos reutilizables

PROHIBIDO EN PAGES

- Realizar assertions
- Consumir APIs
- Leer variables de entorno
- Generar datos de prueba

PROHIBIDO EN FACTORIES

- Interactuar con UI
- Realizar assertions
- Consumir APIs
- Acceder a locators
- Ejecutar acciones Playwright

PROHIBIDO EN API

- Utilizar locators
- Interactuar con UI
- Ejecutar assertions
- Conocer detalles visuales de la aplicación

PROHIBIDO EN FIXTURES

- Contener lógica de negocio
- Realizar assertions
- Implementar flujos funcionales completos
- Almacenar datos estáticos del negocio

PROHIBIDO EN DATA

- Almacenar secretos
- Almacenar credenciales reales
- Ejecutar lógica
- Contener funciones

PROHIBIDO EN CONFIG

- Contener lógica de negocio
- Contener locators
- Contener acciones UI
- Contener assertions
- Contener datos específicos de casos de prueba

PROHIBIDO EN HELPERS

- Declarar locators
- Contener credenciales
- Reemplazar Pages o Api Clients
- Realizar assertions críticas del escenario

PROHIBIDO EN UTILS

- Conocer reglas de negocio
- Acceder a UI
- Consumir APIs específicas del proyecto
- Depender de Pages o Fixtures


---


Toda generación de código debe respetar el principio
de responsabilidad única (SRP).

Cada archivo debe tener una única responsabilidad.
Si una clase necesita interactuar con UI y API al mismo tiempo,
la lógica debe dividirse entre Page, Api y Helper.

Nunca mezclar responsabilidades entre capas.