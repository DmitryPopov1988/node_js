const express = require('express');
const config = require('./config/env_config');
const meteorRouter = require('./router/meteor_router.js');
const roverPhotoRouter = require('./router/rover_photo_router.js');

const app = express();

app.use(express.json());

app.use('/meteors', meteorRouter);
app.use('/photos', roverPhotoRouter);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        status: statusCode,
        message: err.message
    });
});

app.use('*', (req, res) =>
    res.status(404).json({
        status: 404,
        message: 'The requested URL was not found on the server. If you entered the URL manually please check your spelling and try again.'
    }),
);

const port = config.appServerConfig.port;
app.listen(port, () => {
    console.log(`The server is running on port ${port}`);
});