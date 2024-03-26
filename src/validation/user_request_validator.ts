import CoreJoi from 'joi';
import * as JoiDate from '@joi/date';
const Joi = CoreJoi.extend(JoiDate.default(CoreJoi)) as typeof CoreJoi;

export const userRequestSchema = Joi.object({
    user_id: Joi.number().required(),
    user_name: Joi.string().required(),
    api_key: Joi.string().alphanum().length(40).required(),
});