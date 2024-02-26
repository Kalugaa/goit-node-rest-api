require('dotenv').config();
const sendgrid = require('@sendgrid/mail')
const API_KEY = process.env.SENDGRID_API_KEY

sendgrid.setApiKey(API_KEY);

const sendEmail = async (data) => {
    const email = {
        ...data,
        from: "mykyta.kaluhin@meta.ua",
    };
    await sendgrid.send(email)
        .then(() => console.log("Email send success"))
        .catch((error) => console.log(error.message));
};

module.exports = { sendEmail }