import mongoose from 'mongoose';
import config from './config/config.js';
import User from './server/models/user.model.js';
const {ADMIN_EMAIL, ADMIN_PASSWORD} = process.env;
if (!ADMIN_EMAIL || !ADMIN_PASSWORD || ADMIN_PASSWORD.startsWith('replace-') || ADMIN_PASSWORD.length < 8) throw new Error('Set ADMIN_EMAIL and a private ADMIN_PASSWORD in .env');
try {
 await mongoose.connect(config.mongoUri);
 let user = await User.findOne({email:ADMIN_EMAIL});
 if (!user) user = new User({name:'Administrator',email:ADMIN_EMAIL});
 user.role='admin'; user.password=ADMIN_PASSWORD; await user.save();
 console.log('Admin account ready:', ADMIN_EMAIL);
} finally { await mongoose.disconnect(); }
