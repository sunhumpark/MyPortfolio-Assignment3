import authCtrl from '../controllers/auth.controller.js';
import express from 'express';

import {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  deleteAllProjects
} from '../controllers/project.controller.js';

const router = express.Router();

router.get('/', getAllProjects);

router.get('/:id', getProjectById);

router.post('/', authCtrl.requireSignin, authCtrl.requireAdmin, createProject);

router.put('/:id', authCtrl.requireSignin, authCtrl.requireAdmin, updateProject);

router.delete('/:id', authCtrl.requireSignin, authCtrl.requireAdmin, deleteProject);



export default router;