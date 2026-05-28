# 🌐 Avicontrol — Frontend

Interfaz web SPA desarrollada con React 18. Diseño moderno minimalista con modo oscuro, sidebar colapsable y sistema de modales reutilizables.

## 🚀 Instalación

```bash
npm install
npm start
```

Corre en `http://localhost:3000`. El backend debe estar activo en `http://localhost:5000`.

## 📦 Dependencias clave

| Paquete | Uso |
|---------|-----|
| react-router-dom | Navegación SPA |
| axios / fetch | Peticiones a la API |
| recharts | Gráficas del dashboard |
| lucide-react | Iconografía del sistema |

## 🗂 Estructura

```
src/
├── components/
│   ├── Modal.js           Base reutilizable con portal
│   ├── ConfirmModal.js    Confirmación con texto escrito
│   ├── AlertModal.js      Reemplaza alert() nativo
│   ├── GalponForm.js      Formulario de galpón
│   ├── GallinaForm.js     Formulario de lote de gallinas
│   └── Sidebar.js         Navegación colapsable
├── pages/
│   ├── DashboardPage.js   Stats + gráficas
│   ├── GalponesPage.js    Módulo principal
│   ├── ProduccionPage.js  Producción diaria
│   └── GallinasPage.js    Redirige a Galpones
├── services/
│   └── api.js             Cliente HTTP centralizado
├── App.js                 Router y layout principal
└── index.css              Estilos globales + dark mode
```

## 🎨 Características UI/UX

- **Modo oscuro/claro** — toggle en el sidebar
- **Sidebar colapsable** — se colapsa a iconos
- **Sin alert/confirm/prompt** — reemplazados por modales modernos
- **Modales con portal** — usan `ReactDOM.createPortal` para evitar bugs de DOM
- **Gráficas interactivas** — área y barras con recharts
- **Sidebar fijo** — no hace scroll con el contenido
- **Responsive** — grid adaptable a distintos tamaños

## 🧩 Sistema de modales

Todos los modales usan `ReactDOM.createPortal` montándose en `document.body`:

```jsx
// Alerta simple
<AlertModal
  isOpen={open}
  onClose={() => setOpen(false)}
  title="Éxito"
  message="Operación completada."
  type="success"   // success | error | warning | info
/>

// Confirmación con texto
<ConfirmModal
  isOpen={open}
  onClose={() => setOpen(false)}
  onConfirm={handleDelete}
  title="Eliminar galpón"
  message="Esta acción no se puede deshacer."
  confirmWord="Galpón A"   // El usuario debe escribir esto
/>
```

## 🌙 Dark mode

Se controla añadiendo/quitando la clase `dark` en `document.body`. Las variables CSS en `:root` y `.dark` manejan todos los colores del sistema.