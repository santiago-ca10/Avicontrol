# Arquitectura del Sistema

El sistema Avicontrol sigue una arquitectura cliente-servidor con una interfaz web que consume una API REST.

## Frontend

- Tecnologías: React, React Router DOM y Axios.
- Componente principal: `src/App.js` maneja las rutas y navegación.
- Páginas:
  - `DashboardPage` muestra métricas generales.
  - `GallinasPage` lista las gallinas registradas.
  - `CrearGallinaPage` permite agregar nuevas gallinas.
  - `ProduccionPage` muestra los registros de producción de huevos.
- `src/services/api.js` configura el cliente HTTP que consume la API de backend.

## Backend

- Tecnologías: Node.js, Express y MySQL.
- Organización MVC:
  - Controladores en `src/controllers`.
  - Rutas en `src/routes`.
  - Configuración de base de datos en `src/config/db.js`.
- Endpoints principales:
  - `/api/gallinas` para CRUD de gallinas.
  - `/api/produccion` para registrar y consultar producción.

## Base de Datos

- Motor: MySQL.
- Tablas principales:
  - `gallinas`: almacena código, raza, edad y estado de cada gallina.
  - `produccion_huevos`: registra la producción diaria de cada gallina.
- Relaciones:
  - `produccion_huevos.gallina_id` referencia a `gallinas.id`.

## Comunicación

- El frontend realiza llamadas HTTP a la API del backend.
- El intercambio de datos se realiza en formato JSON.

## Despliegue local

- Backend en `http://localhost:3001`.
- Frontend en `http://localhost:3000`.

## Patrón de diseño

- El sistema sigue el patrón MVC en el backend para separar presentación, lógica y acceso a datos.
- En el frontend se usa una arquitectura basada en componentes y rutas para separar vistas.
