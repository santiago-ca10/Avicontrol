const express = require('express');

const router = express.Router();

const produccionController =
    require('../controller/produccion.controller');

router.get(
    '/',
    produccionController.getAllProduccion
);

router.get(
    '/:id',
    produccionController.getProduccionById
);

router.post(
    '/',
    produccionController.createProduccion
);

router.delete(
    '/:id',
    produccionController.deleteProduccion
);

module.exports = router;