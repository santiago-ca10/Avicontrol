const express = require('express');

const router = express.Router();

const galponesController =
    require('../controller/galpones.controller');


// GET ALL
router.get(
    '/',
    galponesController.getAllGalpones
);


// GET BY ID
router.get(
    '/:id',
    galponesController.getGalponById
);


// GET STATS
router.get(
    '/:id/stats',
    galponesController.getGalponStats
);


// CREATE
router.post(
    '/',
    galponesController.createGalpon
);


// UPDATE
router.put(
    '/:id',
    galponesController.updateGalpon
);


// DELETE
router.delete(
    '/:id',
    galponesController.deleteGalpon
);

module.exports = router;
