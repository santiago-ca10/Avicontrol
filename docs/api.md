# 📡 API REST — Avicontrol

Base URL: `http://localhost:5000/api`

Todas las respuestas son en formato JSON.

---

## Galpones `/api/galpones`

### GET /api/galpones
Retorna todos los galpones.

**Respuesta:**
```json
[
  { "id": 1, "nombre": "Galpón A", "capacidad": 100, "estado": "activo" }
]
```

### GET /api/galpones/:id/stats
Stats de un galpón específico.

**Respuesta:**
```json
{
  "id": 1,
  "nombre": "Galpón A",
  "capacidad": 100,
  "total_gallinas": 75,
  "ocupacion": 75.00
}
```

### POST /api/galpones
Crear nuevo galpón.

**Body:**
```json
{ "nombre": "Galpón B", "capacidad": 200 }
```

### PUT /api/galpones/:id
Actualizar galpón. Valida que la nueva capacidad no sea menor a las gallinas activas.

### DELETE /api/galpones/:id
Eliminar galpón. **Falla si tiene gallinas activas o enfermas.**

---

## Gallinas `/api/gallinas`

### GET /api/gallinas
Retorna todas las gallinas. Acepta filtro opcional por galpón.

**Query params:** `?galpon_id=1`

### POST /api/gallinas
Registrar lote de gallinas.

**Body:**
```json
{
  "raza": "ISA Brown",
  "cantidad": 20,
  "edad": 6,
  "galpon_id": 1,
  "fecha_ingreso": "2026-05-27"
}
```

**Respuesta:**
```json
{ "message": "Lote registrado correctamente", "insertadas": 20 }
```

**Validaciones:**
- `cantidad` no puede superar el espacio disponible del galpón
- `galpon_id` debe existir

### PUT /api/gallinas/:id
Actualizar una gallina (raza, edad, estado, fecha_ingreso, galpon_id).

### DELETE /api/gallinas/:id
Eliminar gallina permanentemente.

---

## Producción `/api/produccion`

### GET /api/produccion
Retorna todo el historial con nombre del galpón.

### POST /api/produccion
Registrar producción del día.

**Body:**
```json
{
  "galpon_id": 1,
  "fecha": "2026-05-27",
  "huevos": 80,
  "aves_activas": 95,
  "alimento_kg": 12.5,
  "observaciones": "Sin novedad"
}
```

**Validaciones:**
- No puede existir otro registro para el mismo galpón en la misma fecha
- `huevos` no puede superar `aves_activas`

### PUT /api/produccion/:id
Actualizar registro. Aplica las mismas validaciones excluyendo el registro actual.

### DELETE /api/produccion/:id
Eliminar registro de producción.

---

## Dashboard `/api/dashboard`

### GET /api/dashboard
Stats generales del sistema.

**Respuesta:**
```json
{
  "totalGallinas": 150,
  "gallinasActivas": 140,
  "totalGalpones": 2,
  "produccionHoy": 120,
  "productividadHoy": "85.7"
}
```

### GET /api/dashboard/produccion?dias=30
Producción de los últimos N días para gráfica.

### GET /api/dashboard/galpones
Ocupación actual por galpón.

### GET /api/dashboard/gallinas?dias=30
Historial de aves activas para gráfica.

---

## Códigos de respuesta

| Código | Significado |
|--------|-------------|
| 200 | OK |
| 400 | Error de validación o regla de negocio |
| 404 | Recurso no encontrado |
| 500 | Error interno del servidor |
