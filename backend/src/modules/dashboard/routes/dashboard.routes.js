const express = require('express');

const router = express.Router();

const dashboardController =
    require('../controller/dashboard.controller');


// ======================
// DASHBOARD
// ======================
router.get(
    '/',
    dashboardController.getDashboard
);

module.exports = router;