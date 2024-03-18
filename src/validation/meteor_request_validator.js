const Joi = require('joi').extend(require('@joi/date'));

const meteorRequestSchema = Joi.object({
    start_date: Joi.date().less('now').format('YYYY-MM-DD'),
    end_date: Joi.date().less('now').format('YYYY-MM-DD'),
    count: Joi.boolean().sensitive(),
    were_dangerous_meteors: Joi.boolean().sensitive(),
});

module.exports = meteorRequestSchema;