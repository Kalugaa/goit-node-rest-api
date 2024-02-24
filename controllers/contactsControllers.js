
const { listContacts, getContactById, removeContact, addContact, updateContactService, updateStatusContact } = require('../services');
const { HttpError, catchAsync } = require('../utils');


const getAllContacts = catchAsync(async (req, res) => {

    const contacts = await listContacts(req.user.id)

    if (!contacts) throw new HttpError(500, 'Something went wrong..')

    res.status(200).json({
        contacts
    })
});

const getOneContact = catchAsync(async (req, res) => {

    const contact = await getContactById(req.params.id)

    if (!contact) throw new HttpError(404, 'Not found')

    res.status(200).json({
        contact
    })
});

const deleteContact = catchAsync(async (req, res) => {

    const contactToDelete = await removeContact(req.params.id)

    if (!contactToDelete) throw new HttpError(404, 'Not found')

    res.status(200).json({
        contact: contactToDelete
    })
});

const createContact = catchAsync(async (req, res) => {

    const contact = await addContact(req.body, req.user.id)

    res.status(201).json(contact)

});

const updateContact = catchAsync(async (req, res) => {

    const { id } = req.params
    const updatedContact = await updateContactService(id, req.body)

    if (!updatedContact) throw new HttpError(400, "Not found")

    res.status(200).json({ contact: updatedContact })

});

const updateFavoriteStatus = catchAsync(async (req, res) => {

    const updatedContact = await updateStatusContact(req.params.id, req.body)

    if (!updatedContact) throw new HttpError(400, "Not found")

    res.status(200).json({ contact: updatedContact })

});

module.exports = {
    getAllContacts,
    getOneContact,
    deleteContact,
    createContact,
    updateContact,
    updateFavoriteStatus
}