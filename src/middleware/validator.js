const createHttpError = require('http-errors')
const Validators = require('../validation')

const supportedMethods = ['get', 'post', 'put', 'patch', 'delete'];

const validationOptions = {
    abortEarly: false,
    allowUnknown: false,
    stripUnknown: false,
};

const validator = (schemaName, sourceName) => {
    const validator = Validators[schemaName];
    if (!validator) {
        throw new Error(`${schemaName} validator does not exist`);
    }
    return async (req, res, next) => {
        const method = req.method.toLowerCase();
        if (!supportedMethods.includes(method)) {
            next();
        }
        const source = req[sourceName];
        try {
            await validator.validateAsync(source, validationOptions);
            next();
        } catch (error) {
            console.error(`${error.message}`);
            if (error.isJoi) {
                return next(createHttpError(422, {message: error.message}));
            }
            next(createHttpError(500));
        }
    };
};

module.exports = validator;