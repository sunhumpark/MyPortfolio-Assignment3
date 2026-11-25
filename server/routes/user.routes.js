import authCtrl from '../controllers/auth.controller.js';

import express from 'express';
import userCtrl from '../controllers/user.controller.js';

const router = express.Router();

// Create user
router.post('/api/users', userCtrl.create);

// Get all users
router.get('/api/users', authCtrl.requireSignin, authCtrl.requireAdmin, userCtrl.list);

// Get user by ID
router.get('/api/users/:userId', authCtrl.requireSignin, authCtrl.requireAdmin, userCtrl.read);

// Update user
router.put('/api/users/:userId', authCtrl.requireSignin, authCtrl.requireAdmin, userCtrl.update);

// Delete user by ID
router.delete('/api/users/:userId', authCtrl.requireSignin, authCtrl.requireAdmin, userCtrl.remove);

// Delete all users


// Load user by ID
router.param('userId', userCtrl.userByID);

export default router;