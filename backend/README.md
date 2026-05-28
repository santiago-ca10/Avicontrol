# 🖥 Avicontrol — Backend

API REST desarrollada con Node.js y Express siguiendo Clean Architecture modular.

## 🏗 Arquitectura

Cada módulo sigue la misma estructura de capas:

```
modules/<modulo>/
├── controller/    Recibe HTTP, llama al service
├── service/       Lógica de negocio y validaciones
├── repository/    Acceso a base de datos (SQL)
├── domain/
│   ├── model.js   Entidad del módulo
│   └── port.js    Contrato que el repository implementa
└── routes/        Definición de rutas HTTP
```

## 📦 Módulos

| Módulo | Rutas base | Descripción |
|--------|-----------|-------------|
| dashboard | `/api/dashboard` | Stats y datos para gráficas |
| galpones | `/api/galpones` | CRUD de galpones + stats |
| gallinas | `/api/gallinas` | Registro por lotes y gestión |
| produccion | `/api/produccion` | Producción diaria de huevos |

## 🚀 Instalación

```bash
npm install
cp .env.example .env
node src/app.js
```

## ⚙️ Variables de entorno

```env
DB_HOST=localhost
DB_USER=root
DB_PASS=tu_password
DB_NAME=avicontrol_db
PORT=5000
```

## 📡 Endpoints principales

### Galpones
```
GET    /api/galpones
GET    /api/galpones/:id
GET    /api/galpones/:id/stats
POST   /api/galpones
PUT    /api/galpones/:id
DELETE /api/galpones/:id
```

### Gallinas
```
GET    /api/gallinas?galpon_id=X
POST   /api/gallinas           (registro por lotes)
PUT    /api/gallinas/:id
DELETE /api/gallinas/:id
```

### Producción
```
GET    /api/produccion
POST   /api/produccion
PUT    /api/produccion/:id
DELETE /api/produccion/:id
```

### Dashboard
```
GET    /api/dashboard
GET    /api/dashboard/produccion?dias=30
GET    /api/dashboard/galpones
GET    /api/dashboard/gallinas?dias=30
```

## ✅ Validaciones implementadas

- No crear dos registros de producción del mismo galpón en la misma fecha
- No registrar más gallinas que la capacidad disponible del galpón
- No eliminar galpones con gallinas activas o enfermas
- No reducir capacidad de un galpón por debajo de sus gallinas activas
- Huevos producidos no pueden superar aves activas
- Confirmación especial para marcar gallinas como muertas o vendidas