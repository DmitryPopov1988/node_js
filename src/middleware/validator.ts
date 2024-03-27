import createHttpError from 'http-errors'
import {NextFunction, Request, Response} from 'express';
import {Schema, ValidationError} from 'joi';

const supportedMethods = ['get', 'post', 'put', 'patch', 'delete'];

const validationOptions = {
    abortEarly: false,
    allowUnknown: false,
    stripUnknown: false,
};

export const validator = (schema: Schema, sourceName: keyof Request) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const method = req.method.toLowerCase();
        if (!supportedMethods.includes(method)) {
            next();
        }
        const source = req[sourceName];
        try {
            await schema.validateAsync(source, validationOptions);
            next();
        } catch (error) {
            console.error(`${String(error)}`);
            if (error instanceof ValidationError) {
                return next(createHttpError(422, {message: String(error)}));
            }
            next(createHttpError(500));
        }
    };
};
