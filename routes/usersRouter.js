const express = require('express');
const { register, login, logout, getCurrentUser, setAvatar } = require('../controllers');
const { checkSignUpData, checkLoginData, protect, upload } = require('../middlewares');

const usersRouter = express.Router();

usersRouter.post("/register", checkSignUpData, register)
usersRouter.post("/login", checkLoginData, login)
usersRouter.post("/logout", protect, logout)
usersRouter.get("/current", protect, getCurrentUser)
usersRouter.patch("/avatars", protect, upload.single('avatarURL'), setAvatar)


module.exports = { usersRouter }