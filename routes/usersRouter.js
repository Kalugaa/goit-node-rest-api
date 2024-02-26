const express = require('express');
const { register, login, logout, getCurrentUser, setAvatar, verifyController, reSendVerifyEmail } = require('../controllers');
const { checkSignUpData, checkLoginData, protect, upload } = require('../middlewares');

const usersRouter = express.Router();

usersRouter.post("/register", checkSignUpData, register)
usersRouter.post("/login", checkLoginData, login)
usersRouter.post("/logout", protect, logout)
usersRouter.get("/current", protect, getCurrentUser)
usersRouter.patch("/avatars", protect, upload.single('avatarURL'), setAvatar)
usersRouter.get("/verify/:verificationToken", verifyController)
usersRouter.post("/verify", reSendVerifyEmail);



module.exports = { usersRouter }