const express = require('express');

const router = express.Router();

const dashboardController =
    require('./dashboard.controller');


// ===============================
// DASHBOARD RESUMEN
// ===============================
router.get(
    '/',
    dashboardController.getResumen
);

module.exports = router;