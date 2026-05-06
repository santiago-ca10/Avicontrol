const express = require('express');
const cors = require('cors');
const gallinasRoutes = require('./routes/gallinas.routes');
const produccionRoutes = require('./routes/produccion.routes');
require('./config/db'); 

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/gallinas', gallinasRoutes);
app.use('/api/produccion', produccionRoutes);

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