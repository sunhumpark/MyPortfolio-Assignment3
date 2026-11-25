import config from './config/config.js';
import app from './server/express.js';
import mongoose from 'mongoose';
try {
  await mongoose.connect(config.mongoUri);
  console.log('Connected to the database!');
  app.listen(config.port, ()=>console.log(`Server started on port ${config.port}`));
} catch(error) { console.error(error.message); process.exit(1); }
