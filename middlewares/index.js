const { checkCreateContactData, checkUpdateContactData, checkContactIdMiddleware, checkUpdateFavoriteContactData } = require('./contactsMiddleware');
const { checkSignUpData, checkLoginData, protect, upload } = require('./userMiddleware');

module.exports = {
    checkCreateContactData,
    checkUpdateContactData,
    checkContactIdMiddleware,
    checkUpdateFavoriteContactData,
    checkSignUpData, checkLoginData, protect,
    upload
}