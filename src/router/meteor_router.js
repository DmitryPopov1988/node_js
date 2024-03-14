const express = require('express');
const router = express.Router();
const meteorController = require('../controller/meteor_controller');

router.get('/', meteorController.getMeteors);

module.exports = router;