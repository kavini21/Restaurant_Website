const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const dishController = require('../controllers/dishController');

// public read
router.get('/', dishController.getDishes);
router.get('/:id', dishController.getDish);

// protected admin
router.post('/', auth, dishController.createDish);
router.put('/:id', auth, dishController.updateDish);
router.delete('/:id', auth, dishController.deleteDish);

module.exports = router;
