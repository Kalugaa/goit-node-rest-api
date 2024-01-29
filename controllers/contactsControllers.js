
const { listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContactService } = require('../services/contactsServices');

const { createContactSchema, updateContactSchema } = require('../schemas/contactsSchemas');

const getAllContacts = async (req, res) => {
    try {
        const users = await listContacts()

        if (!users) res.status(500).json({ msg: "something went wrong" })

        res.status(200).json({
            users
        })

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ "msg": "Internal Server Error" })
    }
};

const getOneContact = async (req, res) => {
    try {
        const id = req.params.id
        const user = await getContactById(id)
        if (!user) res.status(404).json({
            msg: 'Not found'
        })
        res.status(200).json({
            user
        })

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ "msg": "Internal Server Error" })
    }
};

const deleteContact = async (req, res) => {
    try {
        const id = req.params.id
        const contactToDelete = await removeContact(id)
        if (!contactToDelete) res.status(404).json({
            msg: 'Not found'
        })
        res.status(200).json({
            contactToDelete
        })

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ "msg": "Internal Server Error" })
    }
};

const createContact = async (req, res) => {
    try {
        const { error, value } = createContactSchema.validate(req.body)

        if (!error) {
            const { id, name, email, phone } = await addContact(value)
            res.status(201).json({ id, name, email, phone })

        }
        res.status(400).json({ "msg": error.message })

    } catch (error) {
        console.log(error.message)
        res.status(500).json({ "msg": "Internal Server Error" })
    }
};

const updateContact = async (req, res) => {
    try {

        const { error, value } = updateContactSchema.validate(req.body)
        if (error) res.status(400).json({ "msg": error.message })
        
        const bodyLength = Object.keys(value).length

        if (bodyLength === 0) res.status(400).json({ "msg": "Body must have at least one field" })

        const { id } = req.params
        const updatedUser = await updateContactService(id, value)

        if (!updatedUser) {
            return res.status(404).json({ "msg": "Not found" });
        }

        res.status(200).json({ updatedUser })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ "msg": "Internal Server Error" })
    }

};

module.exports = {
    getAllContacts,
    getOneContact,
    deleteContact,
    createContact,
    updateContact,
}