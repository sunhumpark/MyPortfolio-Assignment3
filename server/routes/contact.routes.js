import authCtrl from '../controllers/auth.controller.js';

import express from 'express';

import {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
  deleteAllContacts
} from '../controllers/contact.controller.js';

const router = express.Router();

router.get('/', authCtrl.requireSignin, getAllContacts);

router.get('/:id', authCtrl.requireSignin, getContactById);

router.post('/', authCtrl.requireSignin, authCtrl.requireAdmin, createContact);

router.put('/:id', authCtrl.requireSignin, authCtrl.requireAdmin, updateContact);

router.delete('/:id', authCtrl.requireSignin, authCtrl.requireAdmin, deleteContact);



export default router;