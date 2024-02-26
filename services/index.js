const { listContacts, getContactById, removeContact, updateStatusContact, addContact, updateContactService, checkContactExist, checkContactId } = require('./contactsServices');
const { registerUser, checkUserExists, loginUser, logoutUser, updateAvatar, getUser, verifyToken } = require('./usersServices');
const { checkToken } = require('./jwtServices');
const { sendEmail } = require('./emailServices');

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
    loginUser, checkToken, logoutUser,
    updateAvatar, getUser, verifyToken,
    sendEmail
}