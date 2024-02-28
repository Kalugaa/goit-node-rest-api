
const express = require('express');
const { getAllContacts, getOneContact, deleteContact, updateFavoriteStatus, createContact, updateContact, } = require("../controllers");
const { checkContactIdMiddleware, checkUpdateFavoriteContactData, checkCreateContactData, checkUpdateContactData, protect } = require('../middlewares');

const contactsRouter = express.Router();

contactsRouter.use(protect)

contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:id", checkContactIdMiddleware, getOneContact);

contactsRouter.delete("/:id", checkContactIdMiddleware, deleteContact);

contactsRouter.post("/", checkCreateContactData, createContact);

contactsRouter.put("/:id", checkContactIdMiddleware, checkUpdateContactData, updateContact);

contactsRouter.patch("/:id/favorite", checkContactIdMiddleware, checkUpdateFavoriteContactData, updateFavoriteStatus)

module.exports = { contactsRouter }
