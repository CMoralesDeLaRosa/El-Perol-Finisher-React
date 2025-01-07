# Proyecto El perol: web de recetas. Proyecto React- Finisher

## Tabla de Contenidos

- [Descripción](#descripción)
- [Tecnologías](#tecnologías)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Interacción entre Backend y Frontend](#interacción-backend-frontend)
- [Colecciones y rutas](#ColeccionesRutas)
- [Uso](#uso)

## 1.Descripción

Este proyecto es una aplicación web desarrollada con React para el frontend y un backend personalizado. Es una plataforma de recetas en la que conviven dos tipos principales de usuarios: usuarios básicos y restaurantes profesionales. Además, parte del contenido es accesible sin necesidad de registrarse.

- Funcionalidades:

  1. Acceso sin registro
  2. Consultar recetas publicadas y sus detalles.
  3. Visualizar perfiles públicos de restaurantes.
  4. Usuarios básicos
  5. Gestión de roles de usuarios, diferenciando entre user y admin, limitando así los accesos a cierta información.
  6. Crear un perfil personalizado con:
     - Imagen de perfil.
     - Nombre de usuario.
     - Guardar recetas y restaurantes favoritos.
     - Publicar recetas para compartirlas con la comunidad.
     - Contador de likes para las recetas creadas.
  7. Restaurantes profesionales
     - Todas las funcionalidades de los usuarios básicos.
     - Perfiles publicados accesibles para todos los usuarios.
     - Posibilidad de incluir anuncios sobre su negocio.
     - Contador de likes del perfil y de las recetas creadas.
  8. Administrador
     - Acceso a una vista completa de todos los usuarios y restaurantes registrados.
     - Permisos especiales para:
       A. Eliminar usuarios y restaurantes.
       B. Validar recetas publicadas por los usuarios antes de su publicación.
       C. Validar cuentas profesionales de restaurantes antes de que puedan acceder y sean publicados.

- Estructura del backend

  El backend utiliza tres colecciones principales, las cuales están relacionadas entre sí:

  1. Usuarios.
  2. Restaurantes.
  3. Recetas.

## 2.Tecnologías

- Backend

  1. Multer: Para la carga de archivos.
  2. Cloudinary: Para el almacenamiento en la nube de imágenes y otros archivos multimedia.
  3. Autenticación y autorización:
     Generación de tokens al iniciar sesión, lo que permite manejar los permisos para las distintas secciones de la página.
  4. Roles definidos: Usuarios básicos, restaurantes profesionales y administradores.

- Frontend
  1. React Context: Utilizado para gestionar el estado global de la recuperación de datos almacenados en el localStorage del usuario, ya que es necesario para la correcta actualización de la mayoría de componentes de la aplicación.
  2. Custom hooks:
     - UseRecipes: realizar la petición para recuperar las recetas y sus datos.
     - UseRestaurants: realizar la petición para recuperar los restaurantes y sus datos.
  3. Hooks de React:
     - useState: Para gestionar el estado local de los componentes.
     - useRef: Para la modificación de los datos del usuario sin una re-renderización instantánea.

## 3.Instalación

Para instalar y configurar el proyecto, sigue estos pasos:

1. Clona el repositorio:
   git clone https://github.com/tu_usuario/tu_repositorio.git

2. Navega al directorio del proyecto:
   cd tu_repositorio

3. Instala las dependencias

- Frontend
  Dentro de la carpeta del proyecto frontend, instala las dependencias ejecutando:
  npm install

- Backend
  Si estás utilizando un backend en un subdirectorio, navega a ese subdirectorio e instala las dependencias necesarias con:
  npm install express nodemon mongoose dotenv bcrypt jsonwebtokn multer multer-storage-cloudinary cloudinary cors

4. Dependencias utilizadas

- Frontend

  1. Producción:
     react: ^18.3.1
     react-dom: ^18.3.1
     react-hook-form: ^7.53.0 (gestión de formularios).
     react-icons: ^5.3.0 (colección de iconos).
     react-router-dom: ^6.26.2 (gestión de rutas).

  2. Desarrollo:
     @eslint/js: ^9.9.0 (configuración de ESLint).
     @types/react: ^18.3.3 (tipos para React en TypeScript).
     @types/react-dom: ^18.3.0 (tipos para React DOM).
     @vitejs/plugin-react: ^4.3.1 (plugin para optimizar React con Vite).
     eslint: ^9.9.0 (linter para identificar y corregir errores en el código).
     eslint-plugin-react: ^7.35.0 (reglas adicionales para React).
     eslint-plugin-react-hooks: ^5.1.0-rc.0 (reglas para hooks en React).
     eslint-plugin-react-refresh: ^0.4.9 (integración con React Refresh).
     globals: ^15.9.0 (variables globales conocidas para ESLint).
     vite: ^5.4.1 (herramienta de construcción para aplicaciones web modernas).

- Backend

  1. Producción:
     express: Framework para construir el backend.
     nodemon: Herramienta para reiniciar automáticamente el servidor durante el desarrollo.
     mongoose: ORM para trabajar con MongoDB.
     dotenv: Gestión de variables de entorno.
     bcrypt: Cifrado de contraseñas.
     jsonwebtoken: Manejo de autenticación con JWT.
     multer: Gestión de la carga de archivos.
     multer-storage-cloudinary: Almacenamiento en Cloudinary integrado con Multer.
     cloudinary: Servicio en la nube para almacenar y manipular archivos multimedia.
     cors: Gestión de políticas de seguridad para solicitudes entre dominios.

## 4.Configuración

1. Requisitos Previos
   Asegúrate de tener lo siguiente instalado: Node.js (preferentemente la versión LTS) - MongoDB - Cloudinary - React

2. Configuración de Variables de Entorno

- 2.1 Backend (Node.js/Express)

  - Crea un archivo .env en la raíz del directorio backend y añade las siguientes variables:
    CLOUDINARY_CLOUD_NAME=your_cloud_name
    CLOUDINARY_API_KEY=your_api_key
    CLOUDINARY_API_SECRET=your_api_secret
    MONGODB_URI=mongodb://localhost:27017/your_database_name
    JWT_SECRET=your_jwt_secret_key
    CLOUDINARY_CLOUD_NAME: Nombre de tu cuenta en Cloudinary.
    CLOUDINARY_API_KEY: Clave pública de API proporcionada por Cloudinary.
    CLOUDINARY_API_SECRET: Clave secreta de API proporcionada por Cloudinary.
    MONGODB_URI: La URL de conexión a tu base de datos MongoDB. Puedes obtener esta URL desde su panel de control.
    JWT_SECRET: Clave secreta para firmar y verificar los JWT (debe ser segura y única).

  - Importante: No olvides agregar el archivo .env al archivo .gitignore para evitar que las claves sensibles sean compartidas en el repositorio: .env

  - En tu backend, carga las variables de entorno utilizando dotenv:
    require('dotenv').config();

- 2.2 Frontend (React)

  - Crea un archivo .env en la raíz de tu proyecto frontend y añade las siguientes variables:
    REACT_APP_API_URL=http://localhost:5000/api/v1
    REACT_APP_CLOUDINARY_URL=https://api.cloudinary.com/v1_1/your_cloud_name/upload
    REACT_APP_API_URL: URL base de tu API en el backend.
    REACT_APP_CLOUDINARY_URL: URL pública para interactuar con Cloudinary desde el frontend.
    Importante: No incluyas claves secretas de Cloudinary ni el JWT en el frontend. Solo las configuraciones necesarias para comunicarte con el backend deben ir en este archivo .env.

- 2.3 .gitignore para el frontend

  - También debes agregar el archivo .env del frontend al archivo .gitignore para evitar que las variables de entorno sensibles sean comprometidas.

.env

3. Iniciar el Proyecto

- 3.1 Backend

  - Instala las dependencias en la carpeta backend:
    cd backend
    npm install
  - Ejecuta el servidor del backend:
    npm start

- 3.2 Frontend

  - Instala las dependencias en la carpeta frontend:
    cd frontend
    npm install
  - Ejecuta la aplicación de React:
    npm start 4. Notas Adicionales
  - Asegúrate de tener MongoDB corriendo (si usas MongoDB localmente) o usa una base de datos de MongoDB Atlas.
  - Puedes configurar las claves de Cloudinary directamente en el panel de control de Cloudinary si no lo has hecho aún.
  - Para probar el funcionamiento de la API, usa herramientas como Postman o Insomnia.

4. Poblar base de datos de recetas - Seed

- Este script se encarga de poblar la base de datos con recetas de ejemplo. Lee un archivo CSV (`recipes.csv`) y, tras establecer una conexión con la base de datos MongoDB, inserta los datos correspondientes en la colección de recetas.

- Requisitos:
  - Node.js: Asegúrate de tener instalada una versión compatible de Node.js.
- MongoDB: Debes tener acceso a una instancia de MongoDB.
- Archivo CSV: El archivo `recipes.csv` debe estar presente en la carpeta `data/` y debe tener el siguiente formato:

| Nombre de la columna | Descripción                       |
| -------------------- | --------------------------------- |
| `name`               | Nombre de la receta               |
| `time`               | Tiempo de preparación (min)       |
| `portions`           | Número de porciones               |
| `img`                | URL de la imagen (opcional)       |
| `region`             | Región de la receta               |
| `difficulty`         | Dificultad de la receta           |
| `ingredients`        | Ingredientes (separados por coma) |
| `elaboration`        | Instrucciones de preparación      |

- Uso:

  1. Clona el repositorio en tu máquina local:
     git clone <URL_DEL_REPOSITORIO>

  2. Navega al directorio del proyecto:
     cd <NOMBRE_DEL_DIRECTORIO>

  3. Instala las dependencias necesarias:
     npm install

  4. Asegúrate de que el archivo .env esté configurado correctamente con la URL de tu base de datos MongoDB:
     DB_URL=mongodb://<usuario>:<contraseña>@<host>:<puerto>/<nombre_de_la_base_de_datos>

  5. Ejecuta el script de seed:
     node <RUTA_DEL_SCRIPT>/seed.js

- Notas
  El script eliminará todos los documentos existentes en la colección de recetas antes de insertar los nuevos datos.

  Si el archivo CSV contiene filas con datos incompletos o inválidos, el script mostrará una advertencia y omitirá esas filas.

## 4.Interacción entre Backend y Frontend

En este proyecto, el frontend y el backend interactúan mediante una API RESTful. El frontend, desarrollado en React, hace peticiones HTTP (GET, POST, PUT, DELETE) al backend, el cual está construido con Node.js y Express. A continuación se describe cómo ocurre la interacción:

1. Autenticación y autorización:
   Cuando un usuario se registra o inicia sesión, el frontend envía los datos correspondientes (como nombre, email y contraseña) al backend a través de una petición POST a la ruta /api/v1/users/register o /api/v1/users/login.

   El backend verifica los datos y genera un token JWT (JSON Web Token) que se envía de vuelta al frontend. Este token es almacenado en el localStorage del navegador del cliente y se utiliza para autenticar las solicitudes posteriores.

2. Acceso a recursos protegidos:
   Para acceder a recursos que requieren autenticación (como obtener recetas o actualizar el perfil), el frontend incluye el token JWT en el encabezado de las solicitudes GET, PUT, o DELETE a las rutas correspondientes.

   El backend verifica el token y valida si el usuario tiene permisos para realizar la acción solicitada.

3. Gestión de recetas, restaurantes y usuarios:
   El frontend puede hacer peticiones al backend para agregar o eliminar recetas o restaurantes favoritos (por ejemplo, utilizando rutas como /api/v1/users/:id/add-recipe/:recipeId).
   También puede enviar nuevos datos para crear una receta o registrar un restaurante utilizando las rutas /api/v1/recipes y /api/v1/restaurants/register.
   El backend maneja la validación de estos datos y la lógica de negocio, como la verificación de un restaurante por parte del administrador o la validación de una receta antes de su publicación.

4. Manejo de datos:
   Los datos obtenidos del backend (como usuarios, recetas, restaurantes) son enviados al frontend, donde se gestionan y muestran en la interfaz de usuario.
   Cuando se actualiza alguna información, como el perfil de un usuario o los detalles de un restaurante, el frontend envía la nueva información al backend a través de una petición PUT, y el backend actualiza los datos en la base de datos.

## 5.Colecciones y Rutas

En esta sección se describen las diferentes colecciones que tiene el proyecto y sus respectivas rutas de acceso.

### Users

- **Descripción**: Colección que almacena los datos de los usuarios: nombre, email, contraseña y foto de perfil. Además, cuenta con recipes_created, recipes_liked y restaurants_liked para gestionar las recetas creadas por este usuario y los restaurantes y recetas que ha agregado a sus favoritos.

- **Rutas**:

  - `/api/v1/users`: (GET) Obtiene todos los usuarios. Solo puede obtener todos los datos un perfil de administrador.
    RES 200 - Muestra todos los usuarios
    RES 400 - Error
  - `/api/v1/users/:id`: (GET) Obtiene un usuario por ID. Un usuario solo puede acceder a su propia información.
    RES 200 - Muestra la información del usuario.
    RES 400 - Error
  - `/api/v1/users/register`: (POST) Registra un nuevo usuario.
    RES 201 - Te has registrado correctamente. Ya puedes iniciar sesión
    RES 400 - Ese nombre de usuario ya existe
    RES 400 - Ese email ya existe
    RES 400 - La contraseña debe tener como mínimo 8 caracteres, al menos una mayúscula y un número
    RES 400 - Error al registrarse
  - `/api/v1/users/login`: (POST) Inicia sesión de un usuario existente.
    RES 200 - Accede a la página principal de la web
    RES 400 - El email o la contraseña son incorrectos, si el email es incorrecto
    RES 400 - El email o la contraseña son incorrectos, si la contraseña es incorrecta
    RES 400 Error
  - `/api/v1/users/:id/add-recipe/:recipeId`: (PUT) Añade una receta favorita a recipes_liked.
    RES 200 - Añade la receta a favoritos del usuario
    RES 400 - Error al añadir la receta a favoritos
  - `/api/v1/users/:id/delete-recipe/:recipeId`: (PUT) Elimina una receta favorita de recipes_liked.
    RES 200 - Elimina la receta de favoritos del usuario
    RES 400 - Error al eliminar la receta de favoritos
  - `/api/v1/users/:id/add-restaurant/:restaurantId`: (PUT) Añade un restaurante favorito a restaurants_liked.
    RES 200 - Añade el restaurante a favoritos del usuario
    RES 400 - Error al añadir la restaurante a favoritos
  - `/api/v1/users/:id/delete-restaurant/:restaurantId`: (PUT) Elimina un restaurante favorito de restaurants_liked.
    RES 200 - Elimina el restaurante de favoritos del usuario
    RES 400 - Error al eliminar la restaurante de favoritos
  - `/api/v1/users/update/:id`: (PUT) Modifica los datos del usuario
    RES 200 - Se modifican los datos del usuario
    RES 400 - Ese nombre de usuario ya existe
    RES 400 - Ese email ya existe
    RES 400 - Error
  - `/api/v1/users/:id`: (DELETE) Elimina un usuario por su ID. El usuario solo puede eliminar su propio perfil o su perfil puede ser eliminado por un administrador.
    RES 200 - Se cierra la sesión y aparece la página principal
    RES 400 - Error

### Restaurantes

- **Descripción**: Colección que almacena los datos de los restaurantes: nombre, email, contraseña, foto de perfil, dirección y horario de apertura. Además cuenta con recipes_created, recipes_liked y restaurants_liked para gestionar las recetas creadas por este usuario y los restaurantes y recetas que ha agregado a favoritos. También tiene contador de likes. Esta colección está relacionada con la colección usuarios.

- **Rutas**:

- `/api/v1/restaurants/register`: (POST) Registra un nuevo restaurante y queda pendiente de validación por parte del administrador.
  RES 201 - Te has registrado correctamente, tu cuenta será revisada y validada si todos los datos son correctos.
  RES 400 - Ese nombre de usuario ya existe
  RES 400 - Ese email ya existe
  RES 400 - La contraseña debe tener como mínimo 8 caracteres, al menos una mayúscula y un número
  RES 400 - Error al registrarse
- `/api/v1/restaurants/login`: (POST) Inicia sesión de un restaurante existente.
  RES 200 - Accede a la página principal de la web
  RES 400 - El email o la contraseña son incorrectos, si el email es incorrecto
  RES 400 - El email o la contraseña son incorrectos, si la contraseña es incorrecta
  RES 400 Error
  - `/api/v1/restaurants/validate/:id`: (PUT) Verifica un restaurante para que pueda ser publicado en la aplicación. Esta acción solo puede ser realizada por un administrador.
    RES 200 - Actualizada el compo verified de restaurante a true
    RES 400 - Error
- `/api/v1/restaurants`: (GET) Obtiene todos los restaurantes que ya han sido verificados por el administrador.
  RES 200 - Muestra todos los restaurantes
  RES 400 - Error
- `/api/v1/restaurants/not-verified`: (GET) Obtiene todos los restaurantes todavía no han sido verificados. Estos datos solo los puede obtener el perfil de administrador.
  RES 200 - Muestra todos los restaurantes no verificados
  RES 400 - Error
- `/api/v1/restaurants/:id`: (GET) Obtiene un restaurante por ID. Esta información es accesible a cualquier usuario siempre y cuando el restaurante esté verificado.
  RES 200 - Muestra la información del restaurante.
  RES 400 - Error
  - `/api/v1/restaurants/update/:id`: (PUT) Modifica los datos del restaurante
    RES 200 - Se modifican los datos del restaurante
    RES 400 - Ese nombre de restaurante ya existe
    RES 400 - Ese email ya existe
    RES 400 - Error
- `/api/v1/restaurants/:id/like`: (PUT) Cuando un usuario añade o quita un like a un perfil de restaurante se actualiza su contador.
  RES 200 - Se suma o se resta un like.
  RES 400 - Error
  - `/api/v1/restaurants/:id/phrases`: (PUT) Cada perfil de restaurante puede añadir 3 anuncios a su perfil en forma de titular. Con esta petición se modifican los anuncios.
    RES 200 - Se modifican los anuncios asociados al perfil de restaurante
    RES 400 - Error
- `/api/v1/restaurants/:id/add-recipe/:recipeId`: (PUT) Añade una receta favorita a recipes_liked.
  RES 200 - Añade la receta a favoritos del usuario
  RES 400 - Error al añadir la receta a favoritos
  - `/api/v1/restaurants/:id/delete-recipe/:recipeId`: (PUT) Elimina una receta favorita de recipes_liked.
    RES 200 - Elimina la receta de favoritos del usuario
    RES 400 - Error al eliminar la receta de favoritos
  - `/api/v1/restaurants/:id/add-restaurant/:restaurantId`: (PUT) Añade un restaurante favorito a restaurants_liked.
    RES 200 - Añade el restaurante a favoritos del usuario
    RES 400 - Error al añadir la restaurante a favoritos
  - `/api/v1/restaurants/:id/delete-restaurant/:restaurantId`: (PUT) Elimina un restaurante favorito de restaurants_liked.
    RES 200 - Elimina el restaurante de favoritos del usuario
    RES 400 - Error al eliminar la restaurante de favoritos
  - `/api/v1/restaurants/:id`: (DELETE) Elimina un restaurantes por su ID. El restaurante solo puede eliminar su propio perfil o su perfil puede ser eliminado por el usuario
    RES 200 - Se cierra la sesión y aparece la página principal
    RES 400 - Error

### Recipes

- **Descripción**: Colección que almacena los datos de las recetas. Esta colección está relacionada con la colección usuarios y restaurantes.
- **Rutas**:

  - `/api/v1/recipes/not-verified`: (GET) Obtiene todos las recetas que aún no han sido verificados por el administrador.
    RES 200 - Muestra las recetas no verificadas
    RES 400 - Error
  - `/api/v1/recipes`: (GET) Obtiene todos las recetas verificados.
    RES 200 - Muestra todos las recetas verificadas
    RES 400 - Error
  - `/api/v1/recipes/:id`: (GET) Obtiene los datos de una por su ID siempre que esté verificada. Si no está verificada solo puede acceder el administrador
    RES 200 - Muestra los datos de la receta
    RES 400 - Error
  - `/api/v1/recipes/validate/:id`: (PUT) Verifica una receta para que pueda ser publicada en la aplicación. Esta acción solo puede ser realizada por un administrador.
    RES 200 - Actualizada el compo verified de receta a true
    RES 400 - Error
  - `/api/v1/recipes`: (POST) Publica una receta por parte de un usuario o un restaurante. Quedará pendiente de validación hasta que un administrador la verifique y sea publicada.
    RES 200 - La receta ha sido creada. La estamos revisando para que pueda ser publicada a la mayor brevedad.
    RES 400 - Error
  - `/api/v1/recipes/:id/like`: (PUT) Cuando un usuario añade o quita un like a una receta de se actualiza su contador.
    RES 200 - Se suma o se resta un like.
    RES 400 - Error
  - `/api/v1/recipes/:id`: (DELETE) Elimina una receta por su ID. La receta solo puede eliminada por el usuario/restaurante que la ha creado por un perfil de admnistrador.
    RES 200 - Se elimina la receta
    RES 400 - Error

## 6.Uso

**Registro de usuario**
{"img": "Archivo jpg, png, jpeg, gif o webp",
"name": "Nombre",
"email": "Email",
"password": "Contraseña" (Tiene que tener 8 caracteres, al menos un número y una mayúscula),
"rol": "Por defecto siempre será user"
}

**Registro de restaurante**
{"img": "Archivo jpg, png, jpeg, gif o webp",
"name": "Nombre",
"email": "Email",
"password": "Contraseña" (Tiene que tener 8 caracteres, al menos un número y una mayúscula),
"rol": "Por defecto siempre será user",
"address": "Dirección",
"schedule": "Horario de apertura",
}

**Login de usuario**
{"email": "Email",
"password": "Contraseña"}
Los datos para loguearse como asistente de prueba son:
email: user@gmail.com
password: User123

**Login de restaurante**
{"email": "Email",
"password": "Contraseña"}
Los datos para loguearse como asistente de prueba son:
email: user2@gmail.com
password: User1234

**Login de administrador**
Los datos para loguearse como admnistrador son:
email: admin@gmail.com
password: Admin123

**Actualizar datos de usuario**
En la ruta el id será el id del usuario que queremos modificar.
{"Campo a modificar": "Nuevo dato"}

**Actualizar datos de restaurante**
En la ruta el id será el id del usuario que queremos modificar.
{"Campo a modificar": "Nuevo dato"}

**Crear receta**
{"img": "Archivo jpg, png, jpeg, gif o webp",
"region": "Región",
"difficulty":"´fácil/media/difícil,
"portions":"Porciones",
"Ingredients": "Ingredientes",
"Elaboration": "Elaboración"
}
