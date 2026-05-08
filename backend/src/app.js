const express = require('express');
const cors = require('cors');

const gallinasRoutes = require('./routes/gallinas.routes');
const produccionRoutes = require('./routes/produccion.routes');
const galponesRoutes = require('./routes/galpones.routes');

require('./config/db');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/gallinas', gallinasRoutes);
app.use('/api/produccion', produccionRoutes);
app.use('/api/galpones', galponesRoutes);

app.get('/', (req, res) => {
    res.send('API Avicontrol funcionando 🚀');
});

app.get('/test', (req, res) => {
    res.send('Ruta test OK');
});

const PORT = 3001;

app.listen(PORT, () => {
    console.log(`🚀 Backend corriendo en http://localhost:${PORT}`);
});