const express = require('express');

const router = express.Router();

const galponesController = require('../controller/galpones.controller');

// GALPONES
router.get('/', galponesController.getAllGalpones);

router.post('/', galponesController.createGalpon);

module.exports = router;
