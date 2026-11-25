
import Qualification from '../models/qualification.model.js';
import mongoose from 'mongoose';

export const getAllQualifications = async (req, res) => {
  try {
    const qualifications = await Qualification.find();

    res.status(200).json(qualifications);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
export const getQualificationById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: 'Invalid qualification ID'
      });
    }

    const qualification = await Qualification.findById(id);

    if (!qualification) {
      return res.status(404).json({
        message: 'Qualification not found'
      });
    }

    res.status(200).json(qualification);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

export const createQualification = async (req, res) => {
  try {
    const {
      title,
      firstname,
      lastname,
      email,
      completion,
      description
    } = req.body;

    const newQualification = new Qualification({
      title,
      firstname,
      lastname,
      email,
      completion,
      description
    });

    const savedQualification = await newQualification.save();

    res.status(201).json(savedQualification);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
export const updateQualification = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      title,
      firstname,
      lastname,
      email,
      completion,
      description
    } = req.body;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: 'Invalid qualification ID'
      });
    }

    const updatedQualification =
      await Qualification.findByIdAndUpdate(
        id,
        {
          title,
          firstname,
          lastname,
          email,
          completion,
          description
        },
        { new: true, runValidators: true }
      );

    if (!updatedQualification) {
      return res.status(404).json({
        message: 'Qualification not found'
      });
    }

    res.status(200).json(updatedQualification);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
export const deleteQualification = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: 'Invalid qualification ID'
      });
    }

    const deletedQualification =
      await Qualification.findByIdAndDelete(id);

    if (!deletedQualification) {
      return res.status(404).json({
        message: 'Qualification not found'
      });
    }

    res.status(200).json({
      message: 'Qualification deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
export const deleteAllQualifications = async (req, res) => {
  try {
    const result = await Qualification.deleteMany({});

    res.status(200).json({
      message: 'All qualifications deleted successfully',
      deletedCount: result.deletedCount
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};