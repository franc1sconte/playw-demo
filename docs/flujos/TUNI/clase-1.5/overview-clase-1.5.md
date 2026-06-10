# TUNI Front — Sesión de Estudio

> **Orientado a:** QA / Equipo de producto  
> **Alcance:** Flujo completo de la sesión de estudio: acceso, actividades, feedback, pantallas de cierre.

---

## ¿Qué es la sesión de estudio?

La sesión de estudio es la experiencia de aprendizaje activo de TUNI. El estudiante trabaja conceptos concretos respondiendo actividades de forma secuencial, recibe feedback inmediato por cada respuesta y al finalizar ve un resumen de su desempeño.

La experiencia ocurre dentro del **Tutor Ada** (`/tutor/:materiaId`), que organiza la clase en cuatro pasos:

| Paso | Nombre | Descripción |
|------|--------|-------------|
| 1 | Lección del tema | Ada presenta el contenido teórico del concepto mediante un chat guiado |
| 2 | Actividades de práctica | El estudiante resuelve actividades interactivas embebidas en el chat |
| 3 | Repaso del tema | Ada refuerza y consolida los conceptos trabajados |
| 4 | Desafío final | Última ronda de actividades para medir el dominio alcanzado |

Los pasos 2 y 4 son la **sesión de actividades** propiamente dicha.

---

## Cómo accede el estudiante

Hay dos puntos de entrada:

### Desde el detalle de la materia (clase recomendada)

En la pantalla de detalle de una materia aparece un banner destacado:

- **Etiqueta:** _"Aprendizaje adaptativo"_
- **Título:** _"Clase recomendada"_
- **Descripción:** _"Diseñada para ayudarte a dar el próximo paso."_
- **Botón:** _"Empezar a estudiar"_

Al presionar el botón, el estudiante accede al Tutor Ada para la materia, que elige automáticamente el concepto más adecuado según el progreso del estudiante.

### Desde los módulos del curso

El listado de contenidos muestra los módulos del curso. Al expandir un módulo se listan sus unidades, cada una con un botón **"Estudiar"**. Al presionarlo, el estudiante accede al Tutor Ada enfocado en esa unidad específica.

> **Nota para QA:** Ambas entradas navegan a `/tutor/:materiaId` (con `?unitId=` opcional). No existe acceso directo que salte el tutor.

---

## El Tutor Ada — estructura general

Al ingresar a la sesión, la pantalla abandona el header/sidebar habitual de la plataforma y presenta:

### Header del tutor

- **Izquierda:** indicador del paso actual (ej. _"Concepto — Paso 1: Lección del tema"_), clickeable para ver el plan completo.
- **Derecha:** botón **"Cerrar tutor"** (ícono X) que vuelve a la pantalla anterior (`navigate(-1)`).

### Panel lateral izquierdo (desktop)

- Nombre de la materia y nombre de la sesión actual
- Indicador de dominio: _"Dominio: XX%"_
- **Historial de clases:** lista de sesiones anteriores, con título del concepto y fecha. Permite navegar entre sesiones pasadas.

### Panel lateral derecho / área principal

Chat con Ada. Los mensajes de Ada incluyen botones de acción secundaria: **Me gusta**, **No me gusta**, **Copiar**, **Favorito**.

### Input del chat

- Campo de texto: _"Escribí tu mensaje para Ada"_
- Botones: Adjuntar imagen · Micrófono · Enviar
- Disclaimer: _"Ada puede equivocarse. Siempre verificá la información importante antes de tomar decisiones."_

---

## Flujo: inicio de clase y pregunta diagnóstica

Antes de comenzar, Ada pregunta el nivel de conocimiento previo del estudiante:

> _"¿Cómo venís con este tema?"_

| Opción | Subtexto |
|--------|----------|
| **Estoy empezando desde cero** | _"Quiero entender el tema paso a paso."_ |
| **Ya tengo una base** | _"Quiero profundizar y afianzar lo que sé."_ |

La respuesta adapta el nivel y enfoque de la lección que Ada presenta a continuación.

---

## Paso 1: Lección del tema

Ada presenta el contenido del concepto en forma de mensaje estructurado con:
- Numeración por subtema (1️⃣ 2️⃣ 3️⃣ …)
- Negritas en términos clave
- Separadores visuales entre secciones
- Íconos de idea/atención (💡 📌 👉)
- Una pregunta de cierre que invita al estudiante a reflexionar antes de pasar a las actividades

Mientras Ada va respondiendo las preguntas del estudiante, el indicador de paso en el header sigue marcando _"Paso 1: Lección del tema"_ hasta que el sistema determina que se cubrió el contenido suficiente.

---

## Paso 2 y Paso 4: Actividades de práctica y Desafío final

Cuando el flujo avanza a la fase de actividades, el indicador cambia a _"Paso 2: Actividades de práctica"_ (o _"Paso 4: Desafío final"_) y aparece una actividad interactiva embebida en el chat.

### Estructura de cada actividad

Cada actividad tiene tres estados:

1. **Estado inicial:** se muestra la consigna y el input para responder. El botón **"Comprobar"** está habilitado solo cuando hay una respuesta seleccionada/escrita.
2. **Estado de feedback:** después de presionar "Comprobar" se muestra si la respuesta fue correcta o no. El botón cambia a **"Continuar"**.
3. **Estado completado:** se avanza a la siguiente actividad automáticamente al presionar "Continuar".

---

## Tipos de actividad

### Opción múltiple — una respuesta

- **Instrucción:** _"Leé con atención y seleccioná la respuesta correcta."_
- El estudiante selecciona **una opción** de entre varias.
- Las opciones se muestran en orden aleatorio (Fisher-Yates).
- **Botón:** _"Comprobar"_ (deshabilitado hasta seleccionar) → _"Continuar"_ (post-feedback)

### Opción múltiple — varias respuestas

- **Instrucción:** _"Leé con atención y seleccioná la/s respuesta/s correcta/s."_
- El estudiante puede seleccionar **una o más opciones**.
- Las opciones se muestran en orden aleatorio.
- **Botón:** _"Comprobar"_ → _"Continuar"_

### Completar frase

- **Instrucción:** _"Seleccioná las palabras correctas para completar la oración."_
- Se presenta una oración con uno o varios **huecos**. Debajo aparecen palabras disponibles como chips.
- El estudiante toca el hueco y luego selecciona la palabra correcta, o arrastra el chip al hueco.
- **Botón:** _"Comprobar"_ (habilitado cuando todos los huecos están completos) → _"Continuar"_

### Construir frase

- **Instrucción:** _"Seleccioná y ordená los chips necesarios para armar la oración correcta."_
- Se presentan chips de palabras desordenados. El estudiante los arrastra al área de construcción en el orden correcto.
- **Botón:** _"Comprobar"_ (habilitado cuando hay chips en el área) → _"Continuar"_

### Pregunta abierta

- **Instrucción:** _"Escribí o dictá la respuesta a la siguiente pregunta"_
- El estudiante escribe una respuesta libre en un campo de texto con placeholder: _"Escribí tu respuesta acá..."_
- Opcionalmente puede ver una **pista** antes de responder (ver sección Pistas).
- El feedback es evaluado por IA y se muestra con un sistema de **estrellas** (0 a 3).
- **Botón:** _"Comprobar"_ (habilitado cuando hay texto) → _"Continuar"_

---

## Feedback post-respuesta

### Opción múltiple (una y varias respuestas)

Después de presionar "Comprobar":

- Las opciones correctas se marcan en **verde** (borde `success-500`, fondo `success-50`).
- Las opciones incorrectas seleccionadas se marcan en **rojo** (borde `error-600`, fondo `error-50`).
- El área de feedback muestra:
  - **Si fue correcto:** mensaje positivo (ej. _"¡Buen trabajo!"_) con ícono de check verde.
  - **Si fue incorrecto:** mensaje _"Incorrecto"_ con ícono de X rojo.
- Ambos casos incluyen una **descripción explicativa** del concepto correcto.

> **Nota para QA (mobile):** el feedback aparece en una hoja deslizable desde abajo (bottom sheet). En desktop aparece inline debajo de las opciones.

### Pregunta abierta

Después de "Comprobar", la IA evalúa la respuesta y muestra un **feedback con estrellas**:

| Estrellas | Título |
|-----------|--------|
| 3 ⭐⭐⭐ | _"¡Excelente justificación!"_ |
| 2 ⭐⭐ | _"¡Muy buen trabajo!"_ |
| 1 ⭐ | _"¡Vas bien, seguí así!"_ |
| 0 | _"¡A seguir practicando!"_ |

Además del título siempre hay un texto explicativo generado por la IA.

### Completar frase / Construir frase

El feedback muestra si la construcción fue correcta o no, con indicación visual de los elementos en posición incorrecta.

---

## Pistas (solo en preguntas abiertas)

En las actividades de **pregunta abierta** que tengan pista configurada, aparece un botón antes del campo de respuesta:

- **Botón cerrado:** ícono de bombilla + texto _"Ver pista"_
- **Botón abierto:** ícono X + texto _"Ocultar pista"_

Al abrirla se despliega un bloque con:
- Ícono de bombilla en círculo con gradiente (lavender a púrpura)
- Título: _"Pista"_
- Texto de la pista

No hay penalización por usar la pista. El sistema registra si el estudiante la consultó antes de responder.

> **Nota para QA:** Si la actividad no tiene pista configurada, el botón "Ver pista" directamente no aparece.

---

## Reportar una actividad

En cualquier actividad (antes o después de responder), el estudiante puede reportar un problema. Aparece un link/botón **"Reportar actividad"** con ícono de bandera.

Al presionarlo se abre un modal:

- **Título:** _"¿Qué problema encontraste?"_
- **Opciones de motivo** (checkboxes, varía según tipo de actividad):

  _Para opción múltiple:_
  - "La opción marcada como correcta es incorrecta."
  - "Mi respuesta debería haber sido aceptada."
  - "El enunciado no es claro."
  - "La actividad no se relaciona con la unidad o el tema."

  _Para pregunta abierta:_
  - "Mi respuesta fue evaluada incorrectamente."
  - "El feedback no es claro o suficiente."
  - "El enunciado no es claro."
  - "La actividad no se relaciona con la unidad o el tema."

- **Botones:** _"Cancelar"_ · _"Enviar reporte"_ (deshabilitado hasta seleccionar al menos un motivo)

**Post-reporte:** El botón "Reportar actividad" se reemplaza por la insignia _"Actividad reportada"_. No se puede reportar la misma actividad dos veces.

> **Nota para QA:** El reporte va a un equipo interno y no afecta el flujo del estudiante. La actividad reportada se puede continuar respondiendo normalmente.

---

## Salir de la sesión

El botón **"Cerrar tutor"** (ícono X en el header) cierra el tutor en cualquier momento:

- Navega de vuelta a la pantalla anterior (`navigate(-1)`).
- **No** se pierde el historial de la conversación. Si el estudiante vuelve al tutor, verá la "Clase actual" en el historial y puede continuarla.
- Si el estudiante salió antes de completar las actividades, las respuestas ya dadas **no** se guardan como dominio completado.

---

## Pantallas de cierre (al finalizar las actividades)

Al completar todas las actividades de la sesión (Paso 2 o Paso 4), se muestran tres pantallas en secuencia que aparecen como overlays a pantalla completa con animaciones. Se reproduce un sonido de celebración.

### 1. Puntos ganados (XP)

- **Fondo:** degradado de `primary-100` a blanco
- **Ícono:** círculo con gradiente (lavender a púrpura) con checkmark blanco animado
- **Título:** _"¡Clase completada!"_
- **Subtítulo:** _"¡Excelente! Completaste la clase y sumaste puntos a tu progreso"_
- **Contador XP:** número que sube animado desde 0 hasta el total, con ícono de sparkles
- **Botón:** _"Continuar"_ → avanza a la pantalla de dominio

**Cálculo de XP:**
- Cada respuesta correcta suma **10 XP**
- Si el estudiante tuvo una **racha de 3 o más respuestas correctas consecutivas**, se suma un bono de **100 XP**

### 2. Dominio de la unidad

- **Fondo:** degradado de `primary-100` a blanco
- **Elemento central:** anillo circular animado (SVG con gradiente) que se llena hasta el porcentaje alcanzado
- **Título:** _"Tu dominio en esta unidad"_
- **Subtítulo:** _"Este es el progreso que venís logrando en la unidad ¡Seguí así!"_
- **Porcentaje:** número que aumenta animado hasta el valor final dentro del anillo
- **Botón:** _"Continuar"_ → avanza a la pantalla de racha

**Cálculo de dominio:**
- `% dominio = (respuestas correctas / total actividades) × 100` — redondeado al entero más cercano
- Este porcentaje refleja el desempeño de la sesión actual y contribuye al dominio acumulado de la unidad.

### 3. Racha de estudio

- **Fondo:** degradado de `#feede6` (naranja claro) a blanco
- **Ícono central:** llama animada con partículas/chispas flotantes
- **Contador:** número grande con los días de racha actuales + etiqueta _"días de racha"_
- **Texto descriptivo:** descripción motivacional del logro
- **Calendario semanal:** indicadores L / M / M / J / V con checkmark en los días que el estudiante estudió esa semana. Hoy aparece como completado.
- **Botones de cierre:**

| Situación | Botones disponibles |
|-----------|---------------------|
| Sesión de concepto único | Solo _"Ir a la materia"_ |
| Sesión normal | _"Ir a la materia"_ (secundario) + _"Continuar estudiando"_ (primario) |

Al presionar _"Ir a la materia"_ el sistema navega a `/courses/:materiaId`.  
Al presionar _"Continuar estudiando"_ el tutor inicia una nueva sesión con el siguiente concepto recomendado.

---

## Plan de la clase (detalle de pasos)

El indicador de paso en el header es clickeable y abre un panel lateral con el **Plan de clase**:

- **Ícono y nombre** del concepto actual
- Lista de los 4 pasos con sus títulos

El plan se puede cerrar presionando fuera del panel o con Escape. Es solo informativo, no permite saltar pasos.

---

## Métricas que se muestran durante y después de la sesión

| Métrica | Dónde se ve | Descripción |
|---------|-------------|-------------|
| Progreso del plan | Header del tutor | Indicador del paso actual (Paso 1/2/3/4) |
| Dominio de la unidad | Panel lateral (desktop) | % acumulado antes de la sesión actual |
| Respuestas correctas/incorrectas | Interna (no visible directamente) | Se usan para calcular XP y dominio |
| XP ganados en la sesión | Pantalla de cierre #1 | Calculado al finalizar todas las actividades |
| Dominio alcanzado | Pantalla de cierre #2 | % de respuestas correctas en esta sesión |
| Racha semanal | Pantalla de cierre #3 | Días consecutivos con al menos una sesión completada |

---

## Comportamientos según dispositivo

| Elemento | Desktop | Mobile |
|----------|---------|--------|
| Panel lateral del tutor | Siempre visible | Colapsado, accesible via botón |
| Feedback de actividad | Inline debajo de la pregunta | Bottom sheet deslizable desde abajo |
| Historial de clases | Panel lateral izquierdo | Accesible desde header |
| Pantallas de cierre | Overlay centrado, max-width 640px | Pantalla completa |

---

## Notas para QA

- **Actividades no soportadas en la sesión:** Los tipos `COMPARE_ANSWERS`, `FLASHCARDS` y `LESSON` no aparecen en las actividades de práctica/desafío. Si el backend los devuelve, son filtrados y no se muestran al estudiante.

- **Sin pistas:** La mayoría de las actividades de opción múltiple y construcción de frase no tienen pistas. El botón "Ver pista" solo aparece en preguntas abiertas que tengan pista configurada.

- **Salida sin completar:** Si el estudiante sale con el botón X durante las actividades (Paso 2 o 4), puede volver al tutor desde el historial y la sesión estará disponible en "Clase actual". El dominio no se actualiza hasta completar el cierre.

- **Contador de racha:** El backend puede tener un pequeño desfase al registrar el día de hoy. El frontend asume que hoy ya está completado cuando se termina una sesión (para evitar que el calendario muestre hoy como incompleto).

- **Racha en pantalla de cierre:** Los datos de racha se obtienen de la API en el momento en que se llega a la tercera pantalla de cierre, no antes. Si la conexión falla, puede mostrar un skeleton loader en lugar del contador.

- **Nickname vacío:** Si el usuario no completó el onboarding o tiene nickname vacío, el saludo en la pantalla principal aparece como _"¡Hola, !"_ (el campo queda vacío).

- **Usuario sin cursos:** Si el estudiante no tiene cursos asignados, la pantalla principal muestra _"No hay cursos disponibles"_.

- **Acceso al tutor desde el widget de Canvas:** El botón _"Estudiar con TUNI"_ en Canvas abre un chat flotante de Ada. Desde allí, _"Ir a TUNI"_ abre la app completa en una nueva pestaña con autenticación LTI automática.
