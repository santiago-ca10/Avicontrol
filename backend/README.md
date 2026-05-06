# Avicontrol - Backend

API REST para la gestión de gallinas y producción de huevos.

## Tecnologías

- Node.js
- Express
- MySQL
- dotenv
- cors
- nodemon (desarrollo)

## Requisitos

- Node.js
- npm
- MySQL

## Instalación

1. En la carpeta `backend`, instala dependencias:

```bash
npm install
```

2. Crea un archivo `.env` con los datos de conexión a MySQL:

```env
DB_HOST=localhost
DB_USER=tu_usuario
DB_PASSWORD=tu_password
DB_NAME=nombre_base_datos
DB_PORT=3306
```

3. Asegúrate de crear las tablas necesarias en MySQL:

```sql
CREATE TABLE gallinas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  codigo VARCHAR(255) NOT NULL,
  raza VARCHAR(255),
  edad INT,
  estado VARCHAR(255)
);

CREATE TABLE produccion_huevos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  gallina_id INT NOT NULL,
  fecha DATE,
  cantidad INT,
  observaciones TEXT,
  FOREIGN KEY (gallina_id) REFERENCES gallinas(id)
);
```

## Uso

Inicia el servidor en modo desarrollo:

```bash
npm run dev
```

El servidor correrá en `http://localhost:3001`.

## Endpoints

- `GET /api/gallinas` - Listar todas las gallinas
- `GET /api/gallinas/:id` - Obtener una gallina por id
- `POST /api/gallinas` - Crear una gallina
- `PUT /api/gallinas/:id` - Actualizar una gallina
- `DELETE /api/gallinas/:id` - Eliminar una gallina

- `GET /api/produccion` - Listar registros de producción
- `POST /api/produccion` - Registrar producción de huevos
- `GET /api/produccion/gallina/:gallina_id` - Listar producción de una gallina
- `GET /api/produccion/total/:gallina_id` - Total de huevos por gallina

## Nota

El frontend consume la API en `http://localhost:3001/api`.
