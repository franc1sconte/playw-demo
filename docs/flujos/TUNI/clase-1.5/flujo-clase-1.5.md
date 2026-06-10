# Flujo de Aprendizaje

## Inicio

### Opción 1: Desde cero

```text
Start
└── Desde cero
    └── Preguntas de comprobación
```

#### Escenario A: Responde las 3 preguntas correctamente

```text
Preguntas de comprobación
└── Responde 3 bien
    └── Actividades
```

#### Escenario B: Responde bien, responde bien, responde mal

```text
Preguntas de comprobación
└── 1. Responde bien
    2. Responde bien
    3. Responde mal

    └── 1. Siguiente pregunta
        2. Siguiente pregunta
        3. Repregunta infinitamente hasta responder bien

            └── Actividades
```

#### Escenario C: Responde bien, responde mal, responde mal

```text
Preguntas de comprobación
└── Responde bien
    Responde mal
    Responde mal

    └── 1. Siguiente pregunta
        2. Repregunta
        3. Repregunta infinitamente hasta responder bien

            └── Actividades
```

#### Escenario D: Responde mal las 3 preguntas

```text
Preguntas de comprobación
└── Responde mal
    Responde mal
    Responde mal

    └── 1. Repregunta infinitamente hasta responder bien

            └── Actividades
```

---

### Opción 2: Tengo una base

```text
Start
└── Tengo una base
    └── Actividades
```

---

# Actividades

```text
Actividades
└── Responde actividades
```

## Resultado: Menos de 60% de acierto

```text
Responde actividades
└── Menos de 60% acierto
    └── Actividades de repaso
        └── Desafío final
```

---

## Resultado: Entre 60% y 100% de acierto

```text
Responde actividades
└── Entre 60% - 100% acierto
    └── Acciona pregunta
```

### Opción A: Repasar actividades

```text
Acciona pregunta
└── Repasar actividades?
    └── Actividades de repaso
        └── Desafío final
```

### Opción B: Ir al desafío final

```text
Acciona pregunta
└── Ir a desafío final?
    └── Desafío final
```

---

## Resultado: 100% de acierto

```text
Responde actividades
└── 100% acierto
    └── Desafío final
```

---

# Reglas de negocio

## Preguntas de comprobación

- El usuario comienza en una de dos ramas:
  - Desde cero.
  - Tengo una base.

### Desde cero

Se presentan 3 preguntas de comprobación.

- Si responde correctamente las 3 preguntas:
  - Avanza directamente a Actividades.

- Si falla la tercera pregunta:
  - Se presentan 2 preguntas adicionales.
  - La pregunta incorrecta se repregunta hasta responder correctamente.
  - Luego avanza a Actividades.

- Si falla la segunda y tercera pregunta:
  - Se presenta una nueva pregunta.
  - Las preguntas incorrectas se repreguntan.
  - La última pregunta se repregunta infinitamente hasta responder correctamente.
  - Luego avanza a Actividades.

- Si falla las 3 preguntas:
  - Se repregunta infinitamente hasta responder correctamente.
  - Luego avanza a Actividades.

### Tengo una base

- El usuario omite las preguntas de comprobación.
- Avanza directamente a Actividades.

---

## Actividades

Luego de responder las actividades:

### Menos de 60% de acierto

- Realiza Actividades de repaso.
- Luego accede al Desafío final.

### Entre 60% y 100% de acierto

Se muestra una decisión:

- Repasar actividades.
- Ir directamente al Desafío final.

Si elige repasar:

```text
Actividades de repaso
    ↓
Desafío final
```

Si no:

```text
Desafío final
```

### 100% de acierto

- Accede directamente al Desafío final.