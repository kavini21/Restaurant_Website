const mongoose = require('mongoose');

const InquirySchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Inquiry', InquirySchema);
