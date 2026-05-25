const express = require('express');

const router = express.Router();

const dashboardController =
    require('../controller/dashboard.controller');


// Stats principales
router.get(
    '/',
    dashboardController.getDashboard
);

// Producción reciente para gráfica
// ?dias=30 (opcional)
router.get(
    '/produccion',
    dashboardController.getProduccionReciente
);

// Ocupación por galpón
router.get(
    '/galpones',
    dashboardController.getOcupacionGalpones
);

// Historial gallinas para gráfica
// ?dias=30 (opcional)
router.get(
    '/gallinas',
    dashboardController.getHistorialGallinas
);


module.exports = router;