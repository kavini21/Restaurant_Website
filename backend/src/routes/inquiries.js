const express = require('express');
const router = express.Router();
const inquiryController = require('../controllers/inquiryController');
const auth = require('../middleware/auth');

router.post('/', inquiryController.createInquiry);
router.get('/', auth, inquiryController.getInquiries); // admin only

module.exports = router;
