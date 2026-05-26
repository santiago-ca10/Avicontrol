const express = require('express');
const router  = express.Router();

const gallinasController =
    require('../controller/gallinas.controller');

// GET ALL (?galpon_id=X opcional)
router.get('/',    gallinasController.getAllGallinas);
router.get('/:id', gallinasController.getGallinaById);

// CREATE LOTE
router.post('/',   gallinasController.createLote);

// UPDATE / DELETE
router.put('/:id',    gallinasController.updateGallina);
router.delete('/:id', gallinasController.deleteGallina);

module.exports = router;
