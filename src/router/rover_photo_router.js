const express = require('express');
const router = express.Router();
const roverPhotoController = require('../controller/rover_photo_controller');

router.post("/", roverPhotoController.getRoverPhotos);

module.exports = router;