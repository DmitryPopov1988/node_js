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
import {initSentry} from "./config/sentry_config";

const app = express();
const Sentry = initSentry(app);

nunjucks.configure(path.resolve(__dirname, './template'), {
    autoescape: true,
    express: app,
});

app.use(express.static(path.join(__dirname, '.', 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

app.get('/user', (req, res) => {
    res.sendFile(path.join(__dirname, 'template', 'user_form.html'));
});
app.use('/meteors', validator(meteorRequestSchema, 'query'), meteorRouter);
app.use('/photos', validator(userRequestSchema, 'body'), roverPhotoRouter);

app.use(Sentry.Handlers.errorHandler());

app.use(exceptionHandler);
app.use('*', pageNotFoundHandler);

app.set('view engine', 'html');

const port = env_config.appServerConfig.port;
app.listen(port, () => {
    console.log(`The server is running on port ${port}`);
});