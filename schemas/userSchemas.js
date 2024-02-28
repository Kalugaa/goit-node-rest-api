
const Joi = require('joi');
const { PASSWD_REGEX } = require('../constants');

const authSchema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ua'] } }).required(),
    password: Joi.string().regex(PASSWD_REGEX).required()
}).options({ stripUnknown: true })


module.exports = {
    authSchema
}