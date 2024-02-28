const { Contact } = require("../models");
const { HttpError } = require('../utils');
const { Types } = require('mongoose');

const listContacts = (owner) => Contact.find({ owner })

const getContactById = (id, owner) => Contact.findOne({ _id: id, owner })

const removeContact = (id, owner) => Contact.findByIdAndDelete({ _id: id, owner })

const addContact = async (contactData, owner) => {

    const newContactData = {
        ...contactData,
        favorite: contactData.favorite || false,
        owner
    }
    const newContact = Contact.create(newContactData)

    return newContact
}

const updateContactService = async (id, newContactData, owner) => {
    const contact = await getContactById(id, owner)

    Object.keys(newContactData).forEach((key) => {
        contact[key] = newContactData[key];
    });

    return contact.save();

}

const updateStatusContact = async (id, body, owner) => {
    const contact = await getContactById(id, owner)

    if (body.favorite !== undefined) {
        contact.favorite = body.favorite;
    } else {
        throw new HttpError(404, 'Invalid request body');
    }
    return contact.save();
}

const checkContactExist = async (owner, filter) => {
    const contactExist = await Contact.exists({ owner, ...filter });

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
