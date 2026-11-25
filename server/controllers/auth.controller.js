
import jwt from 'jsonwebtoken';
import { expressjwt } from 'express-jwt';
import User from '../models/user.model.js';
import config from '../../config/config.js';

// Login
const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: 'Email and password are required'
      });
    }

    const user = await User.findOne({ email });

    if (!user || !user.authenticate(password)) {
      return res.status(401).json({
        error: 'Email and password do not match'
      });
    }

    const token = jwt.sign(
      { _id: user._id.toString() },
      config.jwtSecret,
      { expiresIn: '1h' }
    );

    res.cookie('t', token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 1000
    });

    return res.status(200).json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email, role: user.role
      }
    });
  } catch (error) {
    console.error('Sign in error:', error.message);

    return res.status(500).json({
      error: 'Sign in failed'
    });
  }
};

// Logout
const signout = (req, res) => {
  res.clearCookie('t', {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production'
  });

  return res.status(200).json({
    message: 'Signed out successfully'
  });
};

// Protect routes with JWT
const requireSignin = expressjwt({
  secret: config.jwtSecret,
  algorithms: ['HS256'],
  getToken: (req) => {
    const authorization = req.headers.authorization;

    if (authorization?.startsWith('Bearer ')) {
      return authorization.slice(7);
    }

    return req.cookies?.t || null;
  }
});

const requireAdmin = async (req, res, next) => {
  const user = await User.findById(req.auth._id);
  if (!user || user.role !== 'admin') return res.status(403).json({error: 'Admin access required'});
  next();
};
const me = async (req, res) => {
  const user = await User.findById(req.auth._id).select('name email role');
  if (!user) return res.status(401).json({error: 'User not found'});
  res.json(user);
};
export default { requireAdmin, me,
  signin,
  signout,
  requireSignin
};