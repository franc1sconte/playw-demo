# Plan de pruebas - PRODUCT STORE (demoblaze.com)

## Application Overview

PRODUCT STORE (demoblaze.com) es una tienda de productos electronicos de demostracion. Ofrece listado de productos agrupados en tres categorias (Phones, Laptops, Monitors), paginas de detalle de producto, carrito de compras con flujo de pago, registro de usuarios, inicio de sesion, formulario de contacto, y modal "About us" con video. La navegacion principal esta en el navbar superior; los productos se presentan con paginacion (Anterior / Siguiente). Todos los flujos de autenticacion, contacto y "About us" se ejecutan como modales sobre la pagina.

## Test Scenarios

### 1. Navegacion y Home

**Seed:** `tests/example.spec.ts`

#### 1.1. Carga inicial de la pagina Home y visualizacion del catalogo

**File:** `tests/siglo/home-catalogo.spec.ts`

**Steps:**
  1. Navegar a la URL de la tienda demoblaze
    - expect: La pagina carga correctamente
    - expect: El titulo de la pagina es 'STORE'
    - expect: El logotipo 'PRODUCT STORE' es visible en el navbar
  2. Verificar que el navbar contiene los enlaces: Home, Contact, About us, Cart, Log in, Sign up
    - expect: Todos los enlaces del navbar estan visibles y accesibles
  3. Verificar que el carrusel de imagenes esta visible y tiene controles de navegacion (Previous, Next)
    - expect: El carrusel muestra la primera imagen activa y los botones de control son interactuables
  4. Verificar que el panel de categorias muestra: CATEGORIES, Phones, Laptops, Monitors
    - expect: Las cuatro opciones de categoria estan visibles en el panel lateral
  5. Verificar que la grilla de productos muestra al menos un producto con nombre, precio y descripcion
    - expect: Se muestran tarjetas de producto con titulo, precio en formato '$XXX' y texto descriptivo
  6. Verificar que el footer contiene el texto 'Copyright © Product Store'
    - expect: El footer es visible con el texto de copyright correspondiente

#### 1.2. Paginacion del catalogo de productos

**File:** `tests/siglo/home-paginacion.spec.ts`

**Steps:**
  1. Navegar a la URL de la tienda demoblaze
    - expect: La pagina Home carga correctamente con la primera pagina de productos
  2. Anotar los nombres de los productos visibles en la primera pagina del catalogo
    - expect: Se listan productos en la primera pagina (hasta 9 productos)
  3. Hacer clic en el boton 'Next' de la paginacion de productos
    - expect: La grilla de productos se actualiza y muestra un conjunto distinto de productos
  4. Verificar que los productos de la segunda pagina son diferentes a los de la primera pagina
    - expect: Los titulos de los productos en pagina 2 no coinciden con los de pagina 1
  5. Hacer clic en el boton 'Previous' de la paginacion
    - expect: La grilla vuelve a mostrar los productos de la primera pagina

### 2. Categorias de productos

**Seed:** `tests/example.spec.ts`

#### 2.1. Filtrado de productos por categoria Phones

**File:** `tests/siglo/categorias-phones.spec.ts`

**Steps:**
  1. Navegar a la URL de la tienda demoblaze
    - expect: La pagina Home carga con todos los productos visibles
  2. Hacer clic en la categoria 'Phones' del panel lateral
    - expect: La grilla de productos se actualiza mostrando unicamente telefonos
  3. Verificar que los productos mostrados pertenecen a la categoria Phones (ej. Samsung galaxy s6, Nokia lumia 1520, Nexus 6, etc.)
    - expect: Solo se muestran productos de la categoria Phones; no aparecen laptops ni monitores

#### 2.2. Filtrado de productos por categoria Laptops

**File:** `tests/siglo/categorias-laptops.spec.ts`

**Steps:**
  1. Navegar a la URL de la tienda demoblaze
    - expect: La pagina Home carga con todos los productos visibles
  2. Hacer clic en la categoria 'Laptops' del panel lateral
    - expect: La grilla de productos se actualiza
  3. Verificar que los productos mostrados pertenecen a la categoria Laptops (ej. Sony vaio i5, MacBook air, Dell i7 8gb, MacBook Pro, etc.)
    - expect: Solo se muestran laptops; no aparecen telefonos ni monitores
  4. Hacer clic en la categoria 'Monitors' del panel lateral
    - expect: La grilla se actualiza mostrando unicamente monitores (Apple monitor 24, ASUS Full HD)

### 3. Detalle de producto

**Seed:** `tests/example.spec.ts`

#### 3.1. Visualizacion del detalle de un producto

**File:** `tests/siglo/detalle-producto.spec.ts`

**Steps:**
  1. Navegar a la URL de la tienda demoblaze
    - expect: La pagina Home carga correctamente
  2. Hacer clic en el nombre o imagen de cualquier producto de la grilla
    - expect: Se navega a la pagina de detalle del producto seleccionado
  3. Verificar que la pagina de detalle muestra: nombre del producto (heading h2), precio con la indicacion '*includes tax', separador horizontal, descripcion del producto bajo el label 'Product description'
    - expect: Todos los campos de informacion del producto son visibles y contienen texto no vacio
  4. Verificar que el boton 'Add to cart' esta visible y es interactuable
    - expect: El enlace 'Add to cart' esta presente en la pagina de detalle
  5. Verificar que el navbar en la pagina de detalle mantiene los mismos enlaces que en Home
    - expect: El navbar es consistente con el de la pagina Home

#### 3.2. Agregar producto al carrito desde la pagina de detalle

**File:** `tests/siglo/agregar-al-carrito.spec.ts`

**Steps:**
  1. Navegar directamente a la pagina de detalle de un producto
    - expect: La pagina de detalle del producto carga correctamente con el boton 'Add to cart' visible
  2. Hacer clic en el enlace 'Add to cart'
    - expect: Se muestra una alerta nativa del navegador con el mensaje 'Product added'
  3. Aceptar la alerta de confirmacion
    - expect: La alerta se cierra y se permanece en la pagina de detalle del producto
  4. Navegar al carrito haciendo clic en el enlace 'Cart' del navbar
    - expect: La pagina del carrito carga y muestra el producto recien agregado con su nombre, precio y un enlace 'Delete'
  5. Verificar que el total del carrito refleja el precio del producto agregado
    - expect: El total mostrado en el carrito coincide con el precio del producto

### 4. Carrito y compra

**Seed:** `tests/example.spec.ts`

#### 4.1. Eliminar un producto del carrito

**File:** `tests/siglo/carrito-eliminar-producto.spec.ts`

**Steps:**
  1. Navegar a la pagina de detalle de un producto y agregar el producto al carrito aceptando la alerta de confirmacion
    - expect: El producto se agrega al carrito correctamente
  2. Navegar a la pagina del carrito
    - expect: La pagina del carrito muestra el producto agregado con el enlace 'Delete' en su fila
  3. Hacer clic en el enlace 'Delete' del producto en el carrito
    - expect: El producto es eliminado de la tabla del carrito y el total se actualiza a 0 o queda vacio

#### 4.2. Completar una compra con datos validos (flujo completo de pago)

**File:** `tests/siglo/compra-exitosa.spec.ts`

**Steps:**
  1. Navegar a la pagina de detalle de un producto y agregarlo al carrito; aceptar la alerta 'Product added'
    - expect: El producto queda en el carrito
  2. Navegar a la pagina del carrito
    - expect: El carrito muestra el producto y el total con el precio correcto
  3. Hacer clic en el boton 'Place Order'
    - expect: Se abre el modal 'Place order' con los campos: Total, Name, Country, City, Credit card, Month, Year y el boton 'Purchase'
  4. Completar todos los campos del formulario: nombre, pais, ciudad, numero de tarjeta de credito, mes y anio
    - expect: Todos los campos aceptan el texto ingresado sin errores de validacion visibles
  5. Hacer clic en el boton 'Purchase'
    - expect: Se muestra el modal de confirmacion con el mensaje 'Thank you for your purchase!', los datos de la compra (Id, Amount, Card Number, Name, Date) y el boton 'OK'
  6. Hacer clic en el boton 'OK' del modal de confirmacion
    - expect: El modal se cierra y se regresa a la pagina del carrito

#### 4.3. Intentar realizar una compra con el formulario de pago vacio

**File:** `tests/siglo/compra-formulario-vacio.spec.ts`

**Steps:**
  1. Navegar a la pagina de detalle de cualquier producto y agregarlo al carrito; aceptar la alerta
    - expect: El producto esta en el carrito
  2. Navegar a la pagina del carrito y hacer clic en 'Place Order'
    - expect: El modal 'Place order' se abre con todos los campos vacios
  3. Sin completar ningun campo, hacer clic directamente en el boton 'Purchase'
    - expect: La aplicacion muestra una alerta o mensaje de error indicando que los campos son requeridos, o bien no permite completar la compra con datos vacios

### 5. Autenticacion

**Seed:** `tests/example.spec.ts`

#### 5.1. Registro de un nuevo usuario

**File:** `tests/siglo/registro-usuario.spec.ts`

**Steps:**
  1. Navegar a la URL de la tienda demoblaze
    - expect: La pagina Home carga correctamente
  2. Hacer clic en el enlace 'Sign up' del navbar
    - expect: Se abre el modal 'Sign up' con los campos 'Username' y 'Password' y el boton 'Sign up'
  3. Ingresar un nombre de usuario unico (generado dinamicamente) en el campo 'Username'
    - expect: El campo acepta el texto ingresado
  4. Ingresar una contrasena valida en el campo 'Password'
    - expect: El campo acepta el texto ingresado
  5. Hacer clic en el boton 'Sign up' del modal
    - expect: Se muestra una alerta de confirmacion indicando que el usuario fue registrado exitosamente
  6. Aceptar la alerta
    - expect: La alerta se cierra y el modal de registro se cierra o permanece disponible para cerrar

#### 5.2. Inicio de sesion con credenciales invalidas

**File:** `tests/siglo/login-credenciales-invalidas.spec.ts`

**Steps:**
  1. Navegar a la URL de la tienda demoblaze
    - expect: La pagina Home carga correctamente
  2. Hacer clic en el enlace 'Log in' del navbar
    - expect: Se abre el modal 'Log in' con los campos 'Username' y 'Password' y el boton 'Log in'
  3. Ingresar un nombre de usuario que no existe en el campo 'Username'
    - expect: El campo acepta el texto
  4. Ingresar cualquier valor en el campo 'Password'
    - expect: El campo acepta el texto
  5. Hacer clic en el boton 'Log in'
    - expect: Se muestra una alerta de error indicando que el usuario no existe o que las credenciales son incorrectas
  6. Aceptar la alerta de error
    - expect: La alerta se cierra y el modal de login permanece abierto permitiendo reintentar

### 6. Modales de navegacion

**Seed:** `tests/example.spec.ts`

#### 6.1. Envio del formulario de contacto

**File:** `tests/siglo/formulario-contacto.spec.ts`

**Steps:**
  1. Navegar a la URL de la tienda demoblaze
    - expect: La pagina Home carga correctamente
  2. Hacer clic en el enlace 'Contact' del navbar
    - expect: Se abre el modal 'New message' con los campos: 'Contact Email', 'Contact Name', 'Message' y el boton 'Send message'
  3. Ingresar una direccion de email valida en el campo 'Contact Email'
    - expect: El campo acepta el texto
  4. Ingresar un nombre en el campo 'Contact Name'
    - expect: El campo acepta el texto
  5. Ingresar un mensaje en el campo 'Message'
    - expect: El campo acepta el texto
  6. Hacer clic en el boton 'Send message'
    - expect: Se muestra una alerta de confirmacion indicando que el mensaje fue enviado; el modal se cierra al aceptar la alerta
