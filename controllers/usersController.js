
const { catchAsync, HttpError } = require('../utils');
const { sendEmail } = require('../services');
const { registerUser, loginUser, logoutUser, updateAvatar, verifyToken, getUser } = require('../services');
const { emailConfirmationTemplate } = require('../helpers/emailConfirmationTemplate');


const register = catchAsync(async (req, res) => {

    const user = await registerUser(req.body)
    const { email, subscription, token, verificationToken } = user

    await sendEmail({
        to: email,
        subject: "Email Verification",
        html: emailConfirmationTemplate(verificationToken, true)
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

    const user = await getUser({ email: req.body.email });

    if (!user) res.status(200).json({ "message": "Verification email sent" });

    const { email, verificationToken, verify } = user

    if (verify) throw new HttpError(400, 'Verification has already been passed');

    await sendEmail({
        to: email,
        subject: "Email Verification",
        html: emailConfirmationTemplate(verificationToken)
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