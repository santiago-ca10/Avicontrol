const express = require('express');

const cors = require('cors');

// MODULES
const gallinasRoutes = require('./modules/gallinas/gallinas.routes');

const produccionRoutes = require('./modules/produccion/produccion.routes');

const galponesRoutes = require('./modules/galpones/galpones.routes');

require('./config/db');

const app = express();

app.use(cors());

app.use(express.json());

// ROUTES
app.use('/api/gallinas', gallinasRoutes);

app.use('/api/produccion', produccionRoutes);

app.use('/api/galpones', galponesRoutes);

// TEST
app.get('/', (req, res) => {

    res.send('API Avicontrol funcionando 🚀');

});

app.get('/test', (req, res) => {

    res.send('Ruta test OK');

});

const PORT = 3001;

app.listen(PORT, () => {

    console.log(
        `🚀 Backend corriendo en http://localhost:${PORT}`
    );

});