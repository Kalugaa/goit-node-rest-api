
const { catchAsync, HttpError } = require('../utils');
const { sendEmail } = require('../services');
const { registerUser, loginUser, logoutUser, updateAvatar, verifyToken, getUser } = require('../services');


const register = catchAsync(async (req, res) => {

    const user = await registerUser(req.body)
    const { email, subscription, token, verificationToken } = user

    console.log(user.email);

    await sendEmail({
        to: email,
        subject: "Email Verification",
        html: `<h1>Verify email</h1> <p>Hello, please verify email to URL</p><a>localhost:3000/users/verify/${verificationToken}</a>`
    });

    res.status(200).json({
        user: { email, subscription },
        token
    })
})



const login = catchAsync(async (req, res) => {

    const { user: { email, subscription, token, verify } } = await loginUser(req.body)

    if (!verify) throw new HttpError(404, "User not verified")

    res.status(200).json({
        user: { email, subscription },
        token
    })
})

const logout = catchAsync(async (req, res) => {

    logoutUser(req.user.id)

    req.user = undefined;

    res.sendStatus(204)
})

const getCurrentUser = catchAsync(async (req, res) => {
    const { email, subscription } = req.user

    res.status(200).json({
        email, subscription
    })
})

const setAvatar = catchAsync(async (req, res) => {
    const { id: userId } = req.user;

    if (!req.file) throw new HttpError(400, '"avatarURL" is a required field');
    const user = await updateAvatar(userId, req.file);

    res.status(200).json({ avatarURL: user.avatarURL });
})

const verifyController = catchAsync(async (req, res) => {
    const { verificationToken } = req.params

    await verifyToken(verificationToken)

    res.status(200).json({ message: 'Verification successful', })
})

const reSendVerifyEmail = catchAsync(async (req, res) => {

    const { email, verificationToken, verify } = await getUser({ email: req.body.email });

    if (verify) throw new HttpError(400, 'Verification has already been passed');

    await sendEmail({
        to: email,
        subject: "Email Verification",
        html: `<h1>Verify email</h1><p>Hello, please verify email to URL</p><a href="localhost:3000/users/verify/${verificationToken}">localhost:3000/users/verify/${verificationToken}</a>`
    });

    res.status(200).json({
        "message": "Verification email sent"
    });


})

module.exports = {
    register,
    login,
    logout,
    getCurrentUser,
    setAvatar,
    verifyController,
    reSendVerifyEmail
}