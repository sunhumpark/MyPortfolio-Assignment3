import mongoose from 'mongoose';

const ContactSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  phone: {type: String, default: ''},
  message: {type: String, default: ''},
  email: {
    type: String,
    required: true
  }
});

export default mongoose.model('Contact', ContactSchema);