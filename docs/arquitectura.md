# 🏗 Arquitectura — Avicontrol

## Tipo de arquitectura

**Clean Architecture simplificada con influencia hexagonal.**

Cada módulo es independiente y sigue la misma estructura de capas. Las capas solo se comunican hacia adentro: el controller llama al service, el service llama al repository, nunca al revés.

## Capas

```
HTTP Request
    ↓
[ routes ]        Define endpoints y métodos HTTP
    ↓
[ controller ]    Valida entrada, llama service, retorna respuesta
    ↓
[ service ]       Lógica de negocio, validaciones de dominio
    ↓
[ repository ]    Queries SQL, acceso a MySQL
    ↓
[ MySQL ]
```

## Módulos del backend

```
src/modules/
├── dashboard/     Stats generales y datos para gráficas
├── galpones/      Gestión de galpones y capacidad
├── gallinas/      Ciclo de vida de gallinas por lotes
└── produccion/    Registro diario de huevos
```

Cada módulo contiene:

```
<modulo>/
├── controller/   <modulo>.controller.js
├── service/      <modulo>.service.js
├── repository/   <modulo>.repository.js
├── domain/
│   ├── <modulo>.model.js    Entidad
│   └── <modulo>.port.js     Interfaz (contrato)
└── routes/       <modulo>.routes.js
```

## El rol del port (influencia hexagonal)

El archivo `port.js` define los métodos que el repository DEBE implementar. Si en el futuro se cambia MySQL por otro motor de base de datos, solo se reemplaza el repository sin tocar el service ni el controller.

```js
// gallinas.port.js
class GallinasPort {
  async getAll(galpon_id) { throw new Error('No implementado') }
  async create(data)       { throw new Error('No implementado') }
  // ...
}
```

## Frontend

```
src/
├── components/   Componentes reutilizables
├── pages/        Una página por módulo
└── services/     api.js — cliente HTTP centralizado
```

Arquitectura: **feature por página**, plana por tipo dentro de `components/`. Suficiente para el tamaño actual del proyecto.

## Comunicación frontend ↔ backend

```
React (localhost:3000)
    → api.js (axios/fetch)
        → Express API (localhost:5000/api)
            → MySQL (localhost:3306)
```