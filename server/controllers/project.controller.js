
import Project from '../models/project.model.js';

export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find();

    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

import mongoose from 'mongoose';

export const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: 'Invalid project ID'
      });
    }

    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({
        message: 'Project not found'
      });
    }

    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
export const createProject = async (req, res) => {
  try {
    const {
      title,
      firstname,
      lastname,
      email,
      completion,
      description
    } = req.body;

    const newProject = new Project({
      title,
      firstname,
      lastname,
      email,
      completion,
      description
    });

    const savedProject = await newProject.save();

    res.status(201).json(savedProject);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
export const updateProject = async (req, res) => {
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
        message: 'Invalid project ID'
      });
    }

    const updatedProject = await Project.findByIdAndUpdate(
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

    if (!updatedProject) {
      return res.status(404).json({
        message: 'Project not found'
      });
    }

    res.status(200).json(updatedProject);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: 'Invalid project ID'
      });
    }

    const deletedProject = await Project.findByIdAndDelete(id);

    if (!deletedProject) {
      return res.status(404).json({
        message: 'Project not found'
      });
    }

    res.status(200).json({
      message: 'Project deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
export const deleteAllProjects = async (req, res) => {
  try {
    const result = await Project.deleteMany({});

    res.status(200).json({
      message: 'All projects deleted successfully',
      deletedCount: result.deletedCount
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};