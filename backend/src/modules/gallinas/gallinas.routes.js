const express = require('express');

const router = express.Router();

const gallinasController =
    require('./gallinas.controller');

router.get(
    '/',
    gallinasController.getAllGallinas
);

router.get(
    '/:id',
    gallinasController.getGallinaById
);

router.post(
    '/',
    gallinasController.createGallina
);

router.put(
    '/:id',
    gallinasController.updateGallina
);

router.delete(
    '/:id',
    gallinasController.deleteGallina
);

module.exports = router;