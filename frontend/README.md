# Avicontrol - Frontend

Interfaz web para el sistema Avicontrol. Permite consultar gallinas, registrar nuevas gallinas y ver producción de huevos.

## Tecnologías

- React 19
- React Router DOM
- Axios
- Create React App

## Estructura principal

- `src/App.js` - Rutas y navegación principal.
- `src/pages/DashboardPage.js` - Dashboard con métricas.
- `src/pages/GallinasPage.js` - Vista de gallinas registradas.
- `src/pages/CrearGallinaPage.js` - Formulario de registro de gallinas.
- `src/pages/ProduccionPage.js` - Registro y visualización de producción.
- `src/services/api.js` - Cliente Axios.

## Configuración

El frontend consume la API en:

```js
http://localhost:3001/api
```

Si cambias el puerto o la dirección del backend, actualiza `src/services/api.js`.

## Uso

```bash
cd frontend
npm install
npm start
```

Abre `http://localhost:3000` en el navegador.

## Scripts

- `npm start` - Ejecuta la app en modo desarrollo.
- `npm run build` - Genera la versión de producción.
- `npm test` - Ejecuta pruebas.

## Notas

- Asegúrate de iniciar el backend antes de usar el frontend.
- El backend debe ejecutarse en `http://localhost:3001`.
