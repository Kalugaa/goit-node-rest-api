
const { catchAsync } = require('../utils');

const { registerUser, loginUser, logoutUser } = require('../services');

const register = catchAsync(async (req, res) => {

    const user = await registerUser(req.body)
    const { email, subscription, token } = user

    res.status(200).json({
        user: { email, subscription },
        token
    })
})

const login = catchAsync(async (req, res) => {

    const { user } = await loginUser(req.body)
    const { email, subscription, token } = user

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

module.exports = {
    register,
    login,
    logout,
    getCurrentUser
}