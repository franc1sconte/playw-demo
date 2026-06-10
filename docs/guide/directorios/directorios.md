## Ejemplo de directorios

> **IMPORTANTE:** `playw-demo/` ES la raíz del proyecto. No existe ni debe crearse una carpeta `src/` literal. Todas las capas viven directamente en la raíz del repositorio.

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
