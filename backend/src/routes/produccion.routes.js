const express = require('express');
const router = express.Router();
const produccionController = require('../controllers/produccion.controller');

router.get('/', produccionController.getAllProduccion);
router.post('/', produccionController.createProduccion);
router.get('/gallina/:gallina_id', produccionController.getProduccionByGallina);
router.get('/total/:gallina_id', produccionController.getTotalProduccion);

module.exports = router;
