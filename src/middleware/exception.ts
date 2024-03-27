import nunjucks from 'nunjucks'
import {NextFunction, Request, Response} from 'express';

interface Error {
    status?: number;
    message?: string;
}

export const exceptionHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    const statusCode = err.status || 500;
    const html = nunjucks.render('error.html', {status: statusCode, message: err.message});
    res.status(statusCode);
    res.send(html);
};

export const pageNotFoundHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    const errorMessage = 'The requested URL was not found ' + req.originalUrl;
    console.error(errorMessage);
    const html = nunjucks.render('not_found.html', {status: 404, message: errorMessage});
    res.status(404);
    res.send(html);
};