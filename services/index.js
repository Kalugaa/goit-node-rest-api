const { listContacts, getContactById, removeContact, updateStatusContact, addContact, updateContactService, checkContactExist, checkContactId } = require('./contactsServices');
const { registerUser, checkUserExists, loginUser, logoutUser } = require('./usersServices');
const { checkToken } = require('./jwtServices');

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    updateStatusContact,
    addContact,
    updateContactService,
    checkContactExist,
    checkContactId,
    registerUser, checkUserExists,
    loginUser, checkToken, logoutUser
}