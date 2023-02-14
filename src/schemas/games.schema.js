import Joi from "joi"

export const addGameSchema = Joi.object({
    name: Joi.string().min(1).required(),
    image: Joi.string().uri().required(),
    stockTotal: Joi.number().positive().required(),
    pricePerDay: Joi.number().positive().required(),
})