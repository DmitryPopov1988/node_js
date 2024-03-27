import express from 'express'
import nunjucks from 'nunjucks'
import path from 'path'
import {env_config} from './config/env_config'
import meteorRouter from './router/meteor_router'
import roverPhotoRouter from './router/rover_photo_router'
import {validator} from './middleware/validator'
import {meteorRequestSchema} from './validation/meteor_request_validator';
import {userRequestSchema} from './validation/user_request_validator';
import {exceptionHandler, pageNotFoundHandler} from './middleware/exception'

const app = express();

nunjucks.configure(path.resolve(__dirname, './template'), {
    autoescape: true,
    express: app,
});

app.use(express.static(path.join(__dirname, '.', 'public')));

app.use(express.json());

app.use('/meteors', validator(meteorRequestSchema, 'query'), meteorRouter);
app.use('/photos', validator(userRequestSchema, 'body'), roverPhotoRouter);

app.use(exceptionHandler);
app.use('*', pageNotFoundHandler);

app.set('view engine', 'html');

const port = env_config.appServerConfig.port;
app.listen(port, () => {
    console.log(`The server is running on port ${port}`);
});