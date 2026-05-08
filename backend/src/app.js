const express = require('express');
const cors = require('cors');

// ======================
// CONFIG DB
// ======================
require('./config/db');

// ======================
// MODULES ROUTES
// ======================
const gallinasRoutes = require('./modules/gallinas/routes/gallinas.routes');
const produccionRoutes = require('./modules/produccion/routes/produccion.routes');
const galponesRoutes = require('./modules/galpones/routes/galpones.routes');

// ======================
// APP
// ======================
const app = express();

// MIDDLEWARES
app.use(cors());
app.use(express.json());

// ======================
// ROUTES API
// ======================
app.use('/api/gallinas', gallinasRoutes);
app.use('/api/produccion', produccionRoutes);
app.use('/api/galpones', galponesRoutes);

// ======================
// TEST ROUTES
// ======================
app.get('/', (req, res) => {
    res.send('API Avicontrol funcionando 🚀');
});

app.get('/test', (req, res) => {
    res.send('Ruta test OK');
});

// ======================
// SERVER
// ======================
const PORT = 3001;

app.listen(PORT, () => {
    console.log(`🚀 Backend corriendo en http://localhost:${PORT}`);
});