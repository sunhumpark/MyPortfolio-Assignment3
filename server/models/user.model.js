import mongoose from 'mongoose'
import crypto from 'node:crypto';
const UserSchema = new mongoose.Schema({
name: {
type: String,
trim: true,
required: 'Name is required'
},
email: {
type: String,
trim: true,
unique: 'Email already exists',
match: [/.+\@.+\..+/, 'Please fill a valid email address'],
required: 'Email is required'
},
role: { type: String, enum: ['user', 'admin'], default: 'user' },
created: {
type: Date,
default: Date.now
},
updated: {
type: Date,
default: Date.now
},
hashed_password: {
type: String,
required: 'Password is required'
},
salt: String
});
UserSchema.virtual('password')
.set(function(password) {
  this._password = password;
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hashed_password = hashPassword(password, this.salt);
})
.get(function() {
return this._password;
});
UserSchema.path('hashed_password').validate(function(v) {
if (this._password && this._password.length < 6) {
this.invalidate('password', 'Password must be at least 6 characters.');
}
if (this.isNew && !this._password) {
this.invalidate('password', 'Password is required');
}
}, null);
function hashPassword(password, salt) {
  return crypto.scryptSync(password, salt, 64).toString('hex');
}
UserSchema.methods.authenticate = function(password) {
  if (typeof password !== 'string' || !this.salt || !this.hashed_password) {
    return false;
  }

  const hashed = hashPassword(password, this.salt);
  const stored = Buffer.from(this.hashed_password, 'hex');
  const supplied = Buffer.from(hashed, 'hex');

  return stored.length === supplied.length &&
    crypto.timingSafeEqual(stored, supplied);
};
export default mongoose.model('User', UserSchema);