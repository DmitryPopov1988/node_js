const Sentry = require("@sentry/node");
const {getLatestNasaRoverPhoto} = require('../service/nasa_rover_photo_service.js');

const getRoverPhotos = async (req, res, next) => {
    Sentry.captureEvent({
        user: { id: req.body.user_id },
        level: 'info',
    });
    try {
        const latestNasaRoverPhoto = await getLatestNasaRoverPhoto(req.body.api_key);
        res.redirect(latestNasaRoverPhoto);
    } catch (error) {
        next(error);
    }
}

module.exports = {getRoverPhotos};