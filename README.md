# Avicontrol

Sistema web para la gesti�n de gallinas y el control de producci�n de huevos.

## Descripción

Avicontrol es una aplicación cliente-servidor que permite registrar gallinas, administrar producción de huevos y visualizar estadísticas de la granja.

## Estructura del proyecto

- `backend/` - API REST con Node.js, Express y MySQL.
- `frontend/` - Interfaz web creada con React.
- `docs/` - Documentaci�n de arquitectura y requisitos.

## Cómo ejecutar el proyecto

### Backend

1. Entra a la carpeta `backend`:

```bash
cd backend
```

2. Instala dependencias:

```bash
npm install
```

3. Crea un archivo `.env` con la configuraci�n de MySQL:

```env
DB_HOST=localhost
DB_USER=tu_usuario
DB_PASSWORD=tu_password
DB_NAME=nombre_base_datos
DB_PORT=3306
```

4. Inicia el servidor:

```bash
npm run dev
```

El backend se ejecuta en `http://localhost:3001`.

### Frontend

1. Entra a la carpeta `frontend`:

```bash
cd frontend
```

2. Instala dependencias:

```bash
npm install
```

3. Inicia la aplicación:

```bash
npm start
```

Luego abre `http://localhost:3000`.

## Documentaci�n

- `docs/arquitectura.md` - Diseño arquitectónico del sistema.
- `docs/problema_requisitos.md` - Problema, objetivos y alcance.
- `docs/README.md` - Índice de documentación.

## Notas

- El frontend usa la API en `http://localhost:3001/api`.
- Asegúrate de que el backend esté activo antes de usar la interfaz.
