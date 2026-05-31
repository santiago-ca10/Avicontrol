# 🐓 Avicontrol

Sistema fullstack de gestión avícola moderno y escalable.

## 🎬 Video Demo

[![Ver demo en YouTube](https://img.shields.io/badge/YouTube-Ver%20Demo-red?style=for-the-badge&logo=youtube)](https://youtu.be/QmPBbESu8cw)

---

## ✨ Funcionalidades

- **Dashboard** — estadísticas en tiempo real, gráficas de producción y ocupación por galpón
- **Galpones** — módulo principal con detalle, stats y gestión de gallinas integrada
- **Gallinas** — registro por lotes, control de estado (activa, enferma, vendida, muerta)
- **Producción** — registro diario con validación de duplicados y cálculo de productividad

## 🛠 Tecnologías

| Capa | Tecnología |
|------|------------|
| Frontend | React 18, recharts, lucide-react |
| Backend | Node.js + Express |
| Base de datos | MySQL 8 |
| Driver | mysql2/promise |

## 🚀 Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/santiago-ca10/Avicontrol.git
cd Avicontrol
```

### 2. Base de datos

```sql
CREATE DATABASE avicontrol_db;
```

Ejecutar las tablas desde [`docs/database.md`](docs/database.md).

### 3. Backend

```bash
cd backend
npm install
cp .env.example .env   # Configurar variables
node src/app.js
```

Corre en `http://localhost:5000`

### 4. Frontend

```bash
cd frontend
npm install
npm start
```

Corre en `http://localhost:3000`

## 📁 Estructura

```
Avicontrol/
├── backend/       API REST — Node.js + Express
├── frontend/      SPA — React
├── docs/          Documentación técnica
└── README.md
```

## 📚 Documentación

| Archivo | Contenido |
|---------|-----------|
| [docs/arquitectura.md](docs/arquitectura.md) | Arquitectura del sistema y capas |
| [docs/database.md](docs/database.md) | Esquema de base de datos |
| [docs/api.md](docs/api.md) | Endpoints de la API REST |
| [docs/decisiones.md](docs/decisiones.md) | Decisiones técnicas justificadas |
| [docs/problema_requisitos.md](docs/problema_requisitos.md) | Problema, objetivos y alcance |

## Autor 

Santiago C A

