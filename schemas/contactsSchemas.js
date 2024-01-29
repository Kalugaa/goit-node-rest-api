
const Joi = require('joi');

const createContactSchema = Joi.object({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ua'] } }),
    phone: Joi.number().required()
}).options({ stripUnknown: true })


const updateContactSchema = Joi.object({
    name: Joi.string().min(2).max(30),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ua'] } }),
    phone: Joi.number()
}).options({ stripUnknown: true })

module.exports = {
    createContactSchema,
    updateContactSchema
}