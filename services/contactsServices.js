const { Contact } = require("../models/contactModel");
const { HttpError } = require('../utils/httpError');
const { Types } = require('mongoose');

const listContacts = () => Contact.find()

const getContactById = (id) => Contact.findById(id)

const removeContact = (id) => Contact.findByIdAndDelete(id)

const addContact = async (contactData) => {

    const newContactData = contactData.favorite ? contactData : { ...contactData, "favorite": "false" }

    const newContact = Contact.create(newContactData)

    return newContact
}

const updateContactService = async (id, newContactData) => {
    const contact = await Contact.findById(id)

    Object.keys(newContactData).forEach((key) => {
        contact[key] = newContactData[key];
    });

    return contact.save();

}

const updateStatusContact = async (id, body) => {
    const contact = await Contact.findById(id)

    if (body.favorite !== undefined) {
        contact.favorite = body.favorite;
    } else {
        throw new HttpError(404, 'Invalid request body');
    }
    return contact.save();
}

const checkContactExist = async (filter) => {
    const contactExist = await Contact.exists(filter);

    if (contactExist) throw new HttpError(409, 'Contact already exists..');
};

const checkContactId = async (id) => {
    const isIdValid = Types.ObjectId.isValid(id)

    if (!isIdValid) throw new HttpError(404, 'Contact not found..');

    const userExists = await Contact.exists({ _id: id });

    if (!userExists) throw new HttpError(404, 'Contact not found..');
}



module.exports = {
    listContacts,
    getContactById,
    removeContact,
    updateStatusContact,
    addContact,
    updateContactService,
    checkContactExist,
    checkContactId
}
