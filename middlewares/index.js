const { checkCreateContactData, checkUpdateContactData, checkContactIdMiddleware, checkUpdateFavoriteContactData } = require('./contactsMiddleware');
const { checkSignUpData, checkLoginData, protect } = require('./userMiddleware');

module.exports = {
    checkCreateContactData,
    checkUpdateContactData,
    checkContactIdMiddleware,
    checkUpdateFavoriteContactData,
    checkSignUpData, checkLoginData, protect,
}