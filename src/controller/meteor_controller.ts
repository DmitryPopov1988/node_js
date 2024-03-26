import nunjucks from 'nunjucks'
import {NextFunction, Request, Response} from 'express';
import {getNasaMeteorsData} from '../service/nasa_meteor_service';

export const getMeteors = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const startDate = req.query.start_date as string;
        const endDate = req.query.end_date as string;
        const countOnly = req.query.count as string | undefined === 'true';
        const wereDangerous = req.query.were_dangerous_meteors as string | undefined === 'true';
        const meteors = await getNasaMeteorsData(startDate, endDate, countOnly, wereDangerous);
        const html = nunjucks.render('meteors.html', meteors);
        res.send(html);
    } catch (error) {
        next(error);
    }
}