import nunjucks from 'nunjucks'
import {NextFunction, Request, Response} from 'express';
import {getLatestNasaRoverPhoto} from '../service/nasa_rover_photo_service';

export const getRoverPhotos = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const latestNasaRoverPhoto = await getLatestNasaRoverPhoto(req.body.api_key);
        const html = nunjucks.render('rover_photo.html', {roverPhotoUrl: latestNasaRoverPhoto});
        res.send(html);
        res.redirect(latestNasaRoverPhoto);
    } catch (error) {
        next(error);
    }
}