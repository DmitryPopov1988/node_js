const {getLatestNasaRoverPhoto} = require('../service/nasa_rover_photo_service.js');

const getRoverPhotos = async (req, res, next) => {
    try {
        const latestNasaRoverPhoto = await getLatestNasaRoverPhoto();
        res.redirect(latestNasaRoverPhoto);
    } catch (error) {
        next(error);
    }
}

module.exports = {getRoverPhotos};