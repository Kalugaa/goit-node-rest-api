const express = require('express');
const { register, login, logout, getCurrentUser } = require('../controllers');
const { checkSignUpData, checkLoginData, protect } = require('../middlewares');

const usersRouter = express.Router();

usersRouter.post("/register", checkSignUpData, register)
usersRouter.post("/login", checkLoginData, login)
usersRouter.post("/logout", protect, logout)
usersRouter.get("/current", protect, getCurrentUser)


module.exports = { usersRouter }