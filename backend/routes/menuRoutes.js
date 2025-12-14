const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');
const { authenticate, authorize } = require('../middleware/auth');
const upload = require('../middleware/upload');

// Public routes
router.get('/', menuController.getDishes);
router.get('/:id', menuController.getDish);

// Protected admin routes
router.post('/', authenticate, authorize('admin'), upload.single('image'), menuController.createDish);
router.put('/:id', authenticate, authorize('admin'), menuController.updateDish);
router.delete('/:id', authenticate, authorize('admin'), menuController.deleteDish);

module.exports = router;