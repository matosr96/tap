
# API de Transferencia de Dinero - Monorepo

Este es el código fuente de una API para manejar transferencias de dinero, desarrollada como un monorepo que incluye múltiples paquetes para servicios, entidades, y la infraestructura.

## Requisitos

- Node.js (v16+)
- pnpm (v7+)
- PostgreSQL (o cualquier base de datos soportada)

## Instalación

1. Clonar el repositorio:

   ```bash
   git clone https://github.com/tu-usuario/nombre-del-repo.git
   cd nombre-del-repo
   ```

2. Instalar las dependencias usando `pnpm`:

   ```bash
   pnpm install
   ```

3. Crear el build del proyecto:

   ```bash
   pnpm build
   ```

4. Configurar el archivo `.env` en `apps/api/`:

   Crea un archivo `.env` en `apps/api/` con las siguientes variables:

   ```bash
   PORT=3000
   HOST=localhost
   DATABASE_URL=postgresql://username:password@localhost:5432/database_name
   JWT_SECRET=tu-clave-secreta
   ```

5. Inicializar la base de datos:

   Asegúrate de que PostgreSQL esté corriendo y de que hayas creado la base de datos correspondiente. Luego, ejecuta las migraciones si es necesario.

6. Levantar el servidor:

   ```bash
   pnpm run dev --filter api
   ```

   Esto levantará el servidor en `http://localhost:3000`.

## Uso de la API

Puedes interactuar con la API utilizando herramientas como Postman o cURL. A continuación, algunos ejemplos de endpoints:

- **POST** `/auth/signin` - Iniciar sesión
- **POST** `/account/transfer` - Realizar transferencia
- **GET** `/account/balance` - Obtener saldo actual
- **GET** `/account/history` - Obtener historial de transacciones

## Documentación completa de la API

Puedes encontrar la documentación completa de la API en el siguiente enlace de Postman:

[Documentación de la API](https://documenter.getpostman.com/view/18872650/2sAXxJga1B)

## Estructura del proyecto

```bash
tap/
├── apps/
│   └── api/                  # Aplicación principal
│       └── src/              # Código fuente de la API
│           └── routes/       # Rutas de la API (auth, transaction, user)
│           └── server/       # Configuración del servidor
│       └── .env              # Variables de entorno
│       └── package.json      # Configuración del proyecto
├── packages/
│   └── entities/             # Paquete para las entidades y modelos
│   └── infraestructure/      # Paquete para la infraestructura (base de datos)
│   └── services/             # Paquete para los servicios (auth, transaction, user)
├── pnpm-workspace.yaml        # Configuración del workspace de pnpm
└── turbo.json                 # Configuración de turborepo (opcional)
```

## Licencia

Este proyecto está bajo la licencia MIT.
