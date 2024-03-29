const { createContactSchema, updateContactSchema, updateFavoriteFieldSchema } = require('../schemas');
const { HttpError, catchAsync } = require('../utils');
const { checkContactExist, checkContactId } = require('../services');


const checkCreateContactData = catchAsync(async (req, res, next) => {

    const { error, value } = createContactSchema.validate(req.body)

    if (error) throw new HttpError(400, error.message)

    await checkContactExist(req.user, { email: value.email });

    req.body = value;

    next();
});

const checkUpdateContactData = catchAsync(async (req, res, next) => {
    console.log(Object.keys(req.body).length)
    if (Object.keys(req.body).length === 0) throw new HttpError(400, "Body must have at least one field")

    const { error, value } = updateContactSchema.validate(req.body);

    if (error) throw new HttpError(400, error.message)

    await checkContactExist(req.user, { email: value.email, _id: { $ne: req.params.id } });

    req.body = value;

    next()

});

const checkUpdateFavoriteContactData = catchAsync(async (req, res, next) => {
    console.log(req.body)
    if (!req.body || Object.keys(req.body).length === 0) {
        throw new HttpError(400, "Missing field favorite");
    }
    const { error, value } = updateFavoriteFieldSchema.validate(req.body)

    if (error) throw new HttpError(400, error.message)

    req.body = value;
    next()

})

const checkContactIdMiddleware = catchAsync(async (req, res, next) => {
    await checkContactId(req.params.id)

    next()
});



module.exports = {
    checkCreateContactData,
    checkUpdateContactData,
    checkContactIdMiddleware,
    checkUpdateFavoriteContactData
}