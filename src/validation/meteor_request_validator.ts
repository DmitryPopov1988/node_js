import CoreJoi from 'joi';
import * as JoiDate from '@joi/date';
const Joi = CoreJoi.extend(JoiDate.default(CoreJoi)) as typeof CoreJoi;

export const meteorRequestSchema = Joi.object({
    start_date: Joi.date().less('now').format('YYYY-MM-DD'),
    end_date: Joi.date().less('now').format('YYYY-MM-DD'),
    count: Joi.boolean().sensitive(),
    were_dangerous_meteors: Joi.boolean().sensitive(),
});