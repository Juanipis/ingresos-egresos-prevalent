# **App de Ingresos y Egresos**

Esta aplicación permite gestionar ingresos y egresos, con control de usuarios y roles (admin y user). El rol de `admin` tiene permisos adicionales para agregar o modificar registros financieros y gestionar usuarios, mientras que el rol `user` solo tiene acceso a reportes y dashboards.
IMPORTANTE: La base de datos debe estar en Prisma Accelerate.

## **Requisitos**

- **Node.js** y **npm** deben estar instalados en tu máquina.

## **Instalación y configuración**

1. **Clonar el repositorio** y navegar a la carpeta del proyecto:

    ```bash
    git clone <tu-repositorio>
    cd <tu-carpeta-de-proyecto>
    ```

2. **Instalar dependencias**:

    ```bash
    npm install
    ```

3. **Configurar las variables de entorno**: Crear un archivo `.env` con las siguientes variables:

    ```bash
    AUTH_SECRET=               # Clave secreta para el token
    AUTH_AUTH0_ID=             # ID de la aplicación en Auth0
    AUTH_AUTH0_SECRET=         # Clave de la aplicación en Auth0
    AUTH_AUTH0_ISSUER=         # URL de la aplicación en Auth0
    DATABASE_URL=              # URL de la base de datos (Prisma Accelerate)
    DIRECT_DATABASE_URL=       # URL directa de la base de datos (Postgres)
    ```

4. **Generar el cliente de Prisma**:

    ```bash
    npx prisma generate --no-engine
    ```

5. **Ejecutar la aplicación en modo desarrollo**:

    ```bash
    npm run dev
    ```

## **Despliegue en Vercel**

Para desplegar la aplicación en **Vercel**, sigue estos pasos:

1. Añadir las **mismas variables de entorno** configuradas en local.
2. Seleccionar el **repositorio de GitHub** donde se encuentra el proyecto.
3. Vercel se encargará del resto del proceso de despliegue.

## **Comandos útiles**

- **Linting** del proyecto:

    ```bash
    npm run lint
    ```

- **Formateo del código**:

    ```bash
    npm run prettier
    ```

- **Ejecución de tests con Jest**:

    ```bash
    npm run test
    ```

## **Roles de usuarios**

- **user**: Tiene acceso a la sección de **reportes** y **dashboard**.
- **admin**: Tiene acceso completo a todas las funcionalidades, incluyendo:
  - **Ingresos y egresos**: Agregar, editar y eliminar registros financieros.
  - **Usuarios**: Gestionar roles, eliminar usuarios, y modificar sus nombres.

> **Nota**: Por defecto, los usuarios tienen el rol `user`. Para cambiar el rol de un usuario a `admin`, esto debe hacerse manualmente en la base de datos, modificando el campo `role` en la tabla `User` a `admin`.

## **Base de datos**

La base de datos está gestionada con **Prisma** y es compatible con **PostgreSQL**. Asegúrate de configurar correctamente las URLs de conexión en el archivo `.env`.
