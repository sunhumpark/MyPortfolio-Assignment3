import authCtrl from '../controllers/auth.controller.js';
import express from 'express';

import {
  getAllQualifications,
  getQualificationById,
  createQualification,
  updateQualification,
  deleteQualification,
  deleteAllQualifications
} from '../controllers/qualification.controller.js';

const router = express.Router();

router.get('/', getAllQualifications);

router.get('/:id', getQualificationById);

router.post('/', authCtrl.requireSignin, authCtrl.requireAdmin, createQualification);

router.put('/:id', authCtrl.requireSignin, authCtrl.requireAdmin, updateQualification);

router.delete('/:id', authCtrl.requireSignin, authCtrl.requireAdmin, deleteQualification);



export default router;