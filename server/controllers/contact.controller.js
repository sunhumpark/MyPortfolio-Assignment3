import Contact from '../models/contact.model.js';

export const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
import mongoose from 'mongoose';

export const getContactById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: 'Invalid contact ID'
      });
    }

    const contact = await Contact.findById(id);

    if (!contact) {
      return res.status(404).json({
        message: 'Contact not found'
      });
    }

    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

export const createContact = async (req, res) => {
  try {
    const { firstname, lastname, email, phone, message } = req.body;

    const newContact = new Contact({
      firstname,
      lastname,
      email, phone, message
    });

    const savedContact = await newContact.save();

    res.status(201).json(savedContact);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
export const updateContact = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstname, lastname, email, phone, message } = req.body;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: 'Invalid contact ID'
      });
    }

    const updatedContact = await Contact.findByIdAndUpdate(
      id,
      { firstname, lastname, email, phone, message },
      { new: true, runValidators: true }
    );

    if (!updatedContact) {
      return res.status(404).json({
        message: 'Contact not found'
      });
    }

    res.status(200).json(updatedContact);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
export const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: 'Invalid contact ID'
      });
    }

    const deletedContact = await Contact.findByIdAndDelete(id);

    if (!deletedContact) {
      return res.status(404).json({
        message: 'Contact not found'
      });
    }

    res.status(200).json({
      message: 'Contact deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
export const deleteAllContacts = async (req, res) => {
  try {
    const result = await Contact.deleteMany({});

    res.status(200).json({
      message: 'All contacts deleted successfully',
      deletedCount: result.deletedCount
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};