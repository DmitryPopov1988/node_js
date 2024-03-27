import express from 'express'

import {getRoverPhotos} from '../controller/rover_photo_controller';

const roverPhotoRouter = express.Router();

roverPhotoRouter.post("/", getRoverPhotos);

export default roverPhotoRouter;