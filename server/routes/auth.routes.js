import express from 'express';
import authCtrl from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/api/auth/signin', authCtrl.signin);

router.get('/api/auth/signout', authCtrl.signout);

router.get(
  '/api/auth/protected',
  authCtrl.requireSignin,
  (req, res) => {
    res.status(200).json({
      message: 'Protected route accessed successfully',
      userId: req.auth._id
    });
  }
);

router.get('/api/auth/me', authCtrl.requireSignin, authCtrl.me);
export default router;