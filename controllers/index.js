const { getAllContacts, getOneContact, deleteContact, createContact, updateContact, updateFavoriteStatus } = require('./contactsControllers');
const { register, login, logout, getCurrentUser, setAvatar, verifyController, reSendVerifyEmail } = require('./usersController');


module.exports = {
    getAllContacts,
    getOneContact,
    deleteContact,
    createContact,
    updateContact,
    updateFavoriteStatus,
    register,
    login, logout,
    getCurrentUser,
    setAvatar,
    verifyController,
    reSendVerifyEmail
}