const {getLatestNasaRoverPhoto} = require('../service/nasa_rover_photo_service.js');
const nunjucks = require('nunjucks');

const getRoverPhotos = async (req, res, next) => {
    try {
        const latestNasaRoverPhoto = await getLatestNasaRoverPhoto(req.body.api_key);
        const html = nunjucks.render('rover_photo.html', {roverPhotoUrl: latestNasaRoverPhoto});
        res.send(html);
        res.redirect(latestNasaRoverPhoto);
    } catch (error) {
        next(error);
    }
}

module.exports = {getRoverPhotos};