const { HttpError, catchAsync } = require('../utils');
const { authSchema } = require('../schemas');
const { checkUserExists, checkToken } = require('../services');
const { User } = require('../models');
const path = require('path');
const multer = require('multer');

const getUserById = (id) => User.findById(id)

const checkSignUpData = catchAsync(async (req, res, next) => {

    const { value, error } = authSchema.validate(req.body)

    if (error) throw new HttpError(400, "Invalid user data...")

    await checkUserExists({ email: value.email })

    req.body = value

    next()
})

const checkLoginData = catchAsync(async (req, res, next) => {
    const { value, error } = authSchema.validate(req.body)

    if (error) throw new HttpError(400, "Not authorized...")

    req.body = value
    next()
})

const protect = catchAsync(async (req, res, next) => {
    const token = req.headers.authorization?.startsWith('Bearer') && req.headers.authorization.split(' ')[1]
    const userId = checkToken(token)

    if (!userId) throw new HttpError(400, "Not logged in...")

    const currentUser = await getUserById(userId)

    if (!currentUser) throw new HttpError(400, "Not logged in...")

    if (!currentUser.verify) throw new HttpError(400, "Not logged in...")

    req.user = currentUser

    next()
})

const tempDir = path.join(process.cwd(), 'tmp');

const multerConfig = multer.diskStorage({
    destination: tempDir,
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({
    storage: multerConfig,
});


module.exports = { checkSignUpData, checkLoginData, protect, upload }