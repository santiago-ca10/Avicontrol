const express = require('express');

const router = express.Router();

const produccionController = require('../controllers/produccion.controller');

// PRODUCCIÓN
router.get('/', produccionController.getAllProduccion);

router.post('/', produccionController.createProduccion);

module.exports = router;