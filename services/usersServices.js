const { User } = require("../models");
const { signToken } = require('./jwtServices');
const { HttpError } = require('../utils');
const path = require('path');
const fs = require('fs').promises;
const jimp = require('jimp');
const { v4 } = require('uuid');

const setToken = (id, token) => User.findByIdAndUpdate(id, { token: token })

const registerUser = async (data) => {

    const verificationToken = v4()

    const newUser = await User.create({ ...data, verificationToken })
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

const updateUser = (userId, body) =>
    User.findByIdAndUpdate(userId, body, { new: true })


const updateAvatar = async (userId, fileData) => {
    const { path: tempUpload, originalname } = fileData;

    const image = await jimp.read(tempUpload);
    image.resize(250, 250).write(tempUpload);

    const avatarsDir = path.join(process.cwd(), 'public', 'avatars');
    const filename = `${userId}_${originalname}`;
    const resultUpload = path.join(avatarsDir, filename);
    await fs.rename(tempUpload, resultUpload);

    const avatarURL = path.join('avatars', filename);
    return updateUser(userId, { avatarURL });
};

const getUser = (filter) => User.findOne(filter)

const verifyToken = async (filter) => {
    const user = await getUser({ verificationToken: filter })

    if (!user) throw new HttpError(404, "User not found")

    await updateUser(user.id, {
        verify: true,
        verificationToken: null,
    })

    return

}


module.exports = { registerUser, checkUserExists, loginUser, logoutUser, updateAvatar, getUser, verifyToken }