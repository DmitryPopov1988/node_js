import nunjucks from 'nunjucks'
import * as Sentry from '@sentry/node';
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
    Sentry.captureException(err);
};

export const pageNotFoundHandler = (req: Request, res: Response) => {
    const errorMessage = 'The requested URL was not found ' + req.originalUrl;
    console.error(errorMessage);
    const html = nunjucks.render('not_found.html', {status: 404, message: errorMessage});
    res.status(404);
    res.send(html);
    Sentry.captureException(new Error(errorMessage));
};