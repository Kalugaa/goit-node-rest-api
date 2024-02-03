
const express = require('express');
const { getAllContacts, getOneContact, deleteContact, updateFavoriteStatus, createContact, updateContact, } = require("../controllers/contactsControllers.js");
const { checkContactIdMiddleware, checkUpdateFavoriteContactData, checkCreateContactData, checkUpdateContactData } = require('../middlewares/contactsMiddleware.js');

const contactsRouter = express.Router();

contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:id", checkContactIdMiddleware, getOneContact);

contactsRouter.delete("/:id", checkContactIdMiddleware, deleteContact);

contactsRouter.post("/", checkCreateContactData, createContact);

contactsRouter.put("/:id", checkContactIdMiddleware, checkUpdateContactData, updateContact);

contactsRouter.patch("/:id/favorite", checkContactIdMiddleware, checkUpdateFavoriteContactData, updateFavoriteStatus)

module.exports = contactsRouter
