import Joi from "joi"

export const customersSchema = Joi.object({
    name: Joi.string().required(),
    phone: Joi.string().required(),
    cpf: Joi.string().length(11).regex(/^[0-9]+$/).required(),
    birthday: Joi.date().required()
})