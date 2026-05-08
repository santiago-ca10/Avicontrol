const express = require('express');

const router = express.Router();

const galponesController = require('../controllers/galpones.controller');

// GALPONES
router.get('/', galponesController.getAllGalpones);

router.post('/', galponesController.createGalpon);

module.exports = router;