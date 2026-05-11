const express = require('express');

const router = express.Router();

const galponesController =
    require('../controller/galpones.controller');

router.get(
    '/',
    galponesController.getAllGalpones
);

router.get(
    '/:id',
    galponesController.getGalponById
);

router.post(
    '/',
    galponesController.createGalpon
);

router.put(
    '/:id',
    galponesController.updateGalpon
);

router.delete(
    '/:id',
    galponesController.deleteGalpon
);

module.exports = router;