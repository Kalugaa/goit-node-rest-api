const { getAllContacts, getOneContact, deleteContact, createContact, updateContact, updateFavoriteStatus } = require('./contactsControllers');
const { register, login, logout, getCurrentUser } = require('./usersController');


module.exports = {
    getAllContacts,
    getOneContact,
    deleteContact,
    createContact,
    updateContact,
    updateFavoriteStatus,
    register,
    login, logout,
    getCurrentUser
}