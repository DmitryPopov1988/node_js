import express from 'express'

import {getMeteors} from '../controller/meteor_controller';

const meteorRouter = express.Router();

meteorRouter.get('/', getMeteors);

export default meteorRouter;