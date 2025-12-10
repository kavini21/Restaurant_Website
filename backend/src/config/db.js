const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;
    if (!uri) {
      throw new Error('MONGO_URI is not defined in environment');
    }
    // Mongoose >6 manages parser/topology options internally — pass only the URI.
    await mongoose.connect(uri);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err.message || err);
    // Do not exit the process here — return false so the caller can decide.
    return false;
  }
  return true;
};

module.exports = connectDB;
