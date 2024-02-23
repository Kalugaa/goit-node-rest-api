const { getAllContacts, getOneContact, deleteContact, createContact, updateContact, updateFavoriteStatus } = require('./contactsControllers');

module.exports = {
    getAllContacts,
    getOneContact,
    deleteContact,
    createContact,
    updateContact,
    updateFavoriteStatus
}