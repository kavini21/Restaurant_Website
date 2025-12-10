const Inquiry = require('../models/Inquiry');

exports.createInquiry = async (req, res, next) => {
  try {
    const inquiry = await Inquiry.create(req.body);
    // optional: send email to admin here (nodemailer)
    res.status(201).json({ msg: 'Inquiry received' });
  } catch (err) { next(err); }
};

exports.getInquiries = async (req, res, next) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    res.json(inquiries);
  } catch (err) { next(err); }
};
