const { User } = require("../models");
const { signToken } = require('./jwtServices');
const { HttpError } = require('../utils');

const setToken = (id, token) => User.findByIdAndUpdate(id, { token: token })

const registerUser = async (data) => {

    const newUser = await User.create(data)

    newUser.password = undefined;

    const token = signToken(newUser.id)

    newUser.token = token

    await setToken(newUser.id, token)

    return newUser
}

const loginUser = async ({ email, password }) => {

    const user = await User.findOne({ email })

    if (!user) throw new HttpError(400, "Not authorized...")

    const isPasswordValid = await user.checkPassword(password, user.password)

    if (!isPasswordValid) throw new HttpError(400, "Not authorized...")

    user.password = undefined;

    const token = signToken(user.id)

    user.token = token

    await setToken(user.id, token)

    return { user }

}

const logoutUser = async (id) => {

    await setToken(id, null)

}

const checkUserExists = async (filter) => {
    const userExists = await User.exists(filter);

    if (userExists) throw new HttpError(409, 'Email in use');
};

module.exports = { registerUser, checkUserExists, loginUser, logoutUser }