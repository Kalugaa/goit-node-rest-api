const jwt = require('jsonwebtoken');

const { HttpError } = require('../utils');

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES })
}
const checkToken = (token) => {
    if (!token) throw new HttpError(401, "Not logged in..")

    try {

        const { id } = jwt.verify(token, process.env.JWT_SECRET)

        return id

    } catch (err) {
        throw new HttpError(401, "Not logged in..")
    }
}

module.exports = {
    signToken, checkToken
}