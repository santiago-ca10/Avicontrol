#  API - Avicontrol

Documentación de endpoints del sistema Avicontrol.

---

#  Base URL

```txt
http://localhost:3001/api
🐓 Gallinas
Obtener todas las gallinas
GET
/api/gallinas
Respuesta
[
  {
    "id": 1,
    "codigo": "G001",
    "raza": "Isa Brown",
    "edad": 12,
    "estado": "activa",
    "galpon_id": 1
  }
]
Crear gallina
POST
/api/gallinas
Body
{
  "codigo": "G010",
  "raza": "Isa Brown",
  "edad": 8,
  "galpon_id": 1
}
Actualizar gallina
PUT
/api/gallinas/:id
Body
{
  "codigo": "G001",
  "raza": "Hy Line",
  "edad": 10,
  "estado": "activa",
  "galpon_id": 1
}
Eliminar gallina
DELETE
/api/gallinas/:id
🏠 Galpones
Obtener galpones
GET
/api/galpones
Respuesta
[
  {
    "id": 1,
    "nombre": "Galpón Norte",
    "capacidad": 100
  }
]
Crear galpón
POST
/api/galpones
Body
{
  "nombre": "Galpón Sur",
  "capacidad": 150
}
🥚 Producción
Obtener producción diaria
GET
/api/produccion
Respuesta
[
  {
    "id": 1,
    "galpon_id": 1,
    "fecha": "2026-05-07",
    "huevos": 92,
    "aves_activas": 100,
    "mortalidad": 1,
    "alimento_kg": 25
  }
]
Registrar producción
POST
/api/produccion
Body
{
  "galpon_id": 1,
  "fecha": "2026-05-07",
  "huevos": 92,
  "aves_activas": 100,
  "mortalidad": 1,
  "alimento_kg": 25,
  "observaciones": "Producción estable"
}
✅ Estados HTTP
Código	Significado
200	OK
201	Creado
400	Datos inválidos
404	No encontrado
500	Error interno