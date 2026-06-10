# Plan de pruebas - TUNI / SIGLO (Widget)

## Application Overview



## Test Scenarios

### 1. Redirección a TUNI desde botón "Ir a TUNI" del header

#### 1.1. [TC-SIGLO-001] Validar redirección desde Canvas Internos al curso "Introducción al Derecho" usando el botón "Ir a TUNI" del header del widget hacia la URL general de cursos.

**Inputs:**

URL inicial: https://siglo21.instructure.com/login/canvas#Internos
Usuario: Educabot_Observador
Contraseña: Educabot2026!
Curso: Introducción al Derecho
URL final esperada: https://siglo21.educabot.com/courses

**Pasos:**

1. Acceder a la URL de internos
2. Ingresar credenciales de autenticación
3. Navegar a "Cursos" desde el sideboard
4. Ingresar al curso "Introducción al Derecho"
5. Verificar visibilidad del widget "Estudiar con TUNI"
6. Abrir el widget "Estudiar con TUNI"
7. Click en "Ir a TUNI" dentro del widget (botón del header)
8. eptar permisos de autenticación (condicional)
9. Validar redirección a TUNI - Cambio de dominio a siglo21.educabot.com/courses

#### 1.2. [TC-SIGLO-002] Validar redirección desde Canvas Internos al curso "Derecho Constitucional" usando el botón "Ir a TUNI" del header del widget hacia la URL general de cursos.

**Inputs:**
URL inicial: https://siglo21.instructure.com/login/canvas#Internos
Usuario: Educabot_Observador
Contraseña: Educabot2026!
Curso: Derecho Constitucional
URL final esperada: https://siglo21.educabot.com/courses

**Pasos:**
1. Acceder a la URL de internos
2. Ingresar credenciales de autenticación
3. Navegar a "Cursos" desde el sideboard
4. Ingresar al curso "Derecho Constitucional"
5. Verificar visibilidad del widget "Estudiar con TUNI"
6. Abrir el widget "Estudiar con TUNI"
7. Click en "Ir a TUNI" dentro del widget (botón del header)
8. Aceptar permisos de autenticación (condicional)
9. Validar redirección a TUNI - Cambio de dominio a siglo21.educabot.com/courses

### 2. Redirección a TUNI vía sugerencia del chat

#### 2.1. [TC-SIGLO-003] Validar redirección desde Canvas Internos usando el botón de sugerencia "Ir a una clase en TUNI" dentro del chat del widget hacia la URL específica del tutor del curso.

**Inputs:**
URL inicial: https://siglo21.instructure.com/login/canvas#Internos
Usuario: Educabot_Observador
Contraseña: Educabot2026!
Curso: Introducción al Derecho
URL final esperada (patrón): https://siglo21.educabot.com/tutor/
Mensaje esperado del chatbot: Hoy vamos a trabajar ¿Qué es el Derecho y por qué existe?


**Pasos:**
1. Acceder a la URL de internos
2. Ingresar credenciales de autenticación
3. Navegar a "Cursos" desde el sideboard
4. Ingresar al curso "Introducción al Derecho"
5. Verificar visibilidad del widget "Estudiar con TUNI"
6. Abrir el widget "Estudiar con TUNI"
7. Click en la sugerencia "Ir a una clase en TUNI" dentro del chat (NO usar botón del header)
8. Aceptar permisos de autenticación (condicional)
9. Validar redirección a la clase específica - URL debe ser /tutor/ (NO /courses) y el chatbot debe mostrar el mensaje exacto esperado

#### 2.2. [TC-SIGLO-004] Validar redirección desde Canvas Internos usando el botón de sugerencia "Ir a una clase en TUNI" dentro del chat del widget hacia la URL específica del tutor del curso.

**Inputs:**
URL inicial: https://siglo21.instructure.com/login/canvas#Internos
Usuario: Educabot_Observador
Contraseña: Educabot2026!
Curso: Derecho Constitucional
URL final esperada (patrón): https://siglo21.educabot.com/tutor/
Mensaje esperado del chatbot: Hoy vamos a trabajar Concepto

**Pasos:**
1. Acceder a la URL de internos
2. Ingresar credenciales de autenticación
3. Navegar a "Cursos" desde el sideboard
4. Ingresar al curso "Derecho Constitucional"
5. Verificar visibilidad del widget "Estudiar con TUNI"
6. Abrir el widget "Estudiar con TUNI"
7. Click en la sugerencia "Ir a una clase en TUNI" dentro del chat (NO usar botón del header)
8. Aceptar permisos de autenticación (condicional)
9. Validar redirección a la clase específica - URL debe ser /tutor/ (NO /courses) y el chatbot debe mostrar el mensaje exacto esperado

### 3. Redirección a TUNI vía conversación en el chat

#### 3.1. [TC-SIGLO-005] Validar redirección mediante interacción conversacional natural escribiendo mensajes en el chat, confirmando que el chatbot reconoce el curso y permite disparar la redirección a la clase específica.

**Inputs:**
URL inicial: https://siglo21.instructure.com/login/canvas#Internos
Usuario: Educabot_Observador
Contraseña: Educabot2026!
Curso: Derecho Constitucional
Mensajes a enviar:
Que materia es esta
Vamos a TUNI
URL final esperada (patrón): https://siglo21.educabot.com/tutor/
Mensaje esperado del chatbot: Hoy vamos a trabajar Concepto

**Pasos:**
1. Acceder a la URL de internos
2. Ingresar credenciales de autenticación
3. Navegar a "Cursos" desde el sideboard
4. Ingresar al curso "Derecho Constitucional"
5. Verificar visibilidad del widget "Estudiar con TUNI"
6. Abrir el widget "Estudiar con TUNI"
7. Enviar mensaje "Que materia es esta" y validar que el chatbot responde mencionando "Derecho Constitucional"
8. Enviar mensaje "Vamos a TUNI" para disparar la redirección
9. Click en botón "Continuar" para aceptar la autorización
10. Validar redirección a la clase específica - URL debe ser /tutor/ (NO /courses), la respuesta contextual debe mencionar "Derecho Constitucional" y el chatbot debe mostrar el mensaje exacto esperado



#### 3.2. [TC-SIGLO-006] Validar redirección mediante interacción conversacional natural escribiendo mensajes en el chat, confirmando que el chatbot reconoce el curso y permite disparar la redirección a la clase específica.

**Inputs:**
URL inicial: https://siglo21.instructure.com/login/canvas#Internos
Usuario: Educabot_Observador
Contraseña: Educabot2026!
Curso: Introducción al Derecho
Mensajes a enviar:
Que materia es esta
Vamos a TUNI
URL final esperada (patrón): https://siglo21.educabot.com/tutor/
Mensaje esperado del chatbot: Hoy vamos a trabajar ¿Qué es el Derecho y por qué existe?

**Pasos:**
1. Acceder a la URL de internos
2. Ingresar credenciales de autenticación
3. Navegar a "Cursos" desde el sideboard
4. Ingresar al curso "Introducción al Derecho"
5. Verificar visibilidad del widget "Estudiar con TUNI"
6. Abrir el widget "Estudiar con TUNI"
7. Enviar mensaje "Que materia es esta" y validar que el chatbot responde mencionando "Introducción al Derecho"
8. Enviar mensaje "Vamos a TUNI" para disparar la redirección
9. Click en botón "Continuar" para aceptar la autorización
10. Validar redirección a la clase específica - URL debe ser /tutor/ (NO /courses), la respuesta contextual debe mencionar "Introducción al Derecho" y el chatbot debe mostrar el mensaje exacto esperado