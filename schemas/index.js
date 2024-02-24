const { createContactSchema, updateContactSchema, updateFavoriteFieldSchema } = require('./contactsSchemas');
const { authSchema } = require('./userSchemas');
module.exports = {
    createContactSchema,
    updateContactSchema,
    updateFavoriteFieldSchema,
    authSchema
}