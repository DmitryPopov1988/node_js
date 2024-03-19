const express = require('express');
const nunjucks = require('nunjucks');
const path = require('path');
const config = require('./config/env_config');
const meteorRouter = require('./router/meteor_router.js');
const roverPhotoRouter = require('./router/rover_photo_router.js');
const validator = require('./middleware/validator');
const {exceptionHandler, pageNotFoundHandler} = require(`./middleware/exception`);

const app = express();

nunjucks.configure(path.resolve(__dirname, './template'), {
    autoescape: true,
    express: app,
});

app.use(express.json());

app.use('/meteors', validator('meteorRequest', 'query'), meteorRouter);
app.use('/photos', validator('userRequest', 'body'), roverPhotoRouter);

app.use(exceptionHandler);
app.use('*', pageNotFoundHandler);

const port = config.appServerConfig.port;
app.listen(port, () => {
    console.log(`The server is running on port ${port}`);
});