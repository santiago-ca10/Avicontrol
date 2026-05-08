const express = require('express');
const router = express.Router();


const produccionController =
    require('../controller/produccion.controller');

router.get(
    '/',
    produccionController.getAllProduccion
);

router.post(
    '/',
    produccionController.createProduccion
);

module.exports = router;