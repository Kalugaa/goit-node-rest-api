
const Joi = require('joi');

const createContactSchema = Joi.object({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ua'] } }),
    phone: Joi.number(),
    favorite: Joi.boolean().default(false)
}).options({ stripUnknown: true })


const updateContactSchema = Joi.object({
    name: Joi.string().min(2).max(30),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ua'] } }),
    phone: Joi.number(),
    favorite: Joi.boolean().default(false)
}).options({ stripUnknown: true })

const updateFavoriteFieldSchema = Joi.object({
    favorite: Joi.boolean()
}).options({ stripUnknown: true })


module.exports = {
    createContactSchema,
    updateContactSchema,
    updateFavoriteFieldSchema
}