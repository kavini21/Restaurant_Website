const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticate, authorize } = require('../middleware/auth');

// Public routes
router.post('/register', authController.register);
router.post('/login', authController.login);

// Protected route example
router.get('/profile', authenticate, (req, res) => {
    res.json({ user: req.user });
});

module.exports = router;