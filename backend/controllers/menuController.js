const Dish = require('../models/Dish');

// Get all dishes
exports.getDishes = async (req, res) => {
    try {
        const dishes = await Dish.find({ available: true });
        res.json(dishes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get single dish
exports.getDish = async (req, res) => {
    try {
        const dish = await Dish.findById(req.params.id);
        if (!dish) return res.status(404).json({ message: 'Dish not found' });
        res.json(dish);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create dish (admin only)
exports.createDish = async (req, res) => {
    try {
        const dish = new Dish({
            ...req.body,
            image: req.file ? {
                url: req.file.url,
                public_id: req.file.publicId || null
            } : null
        });
        await dish.save();
        res.status(201).json(dish);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update dish (admin only)
exports.updateDish = async (req, res) => {
    try {
        const updateData = { ...req.body };
        
        // If new image is uploaded, update image field
        if (req.file) {
            updateData.image = {
                url: req.file.url,
                public_id: req.file.publicId || null
            };
        }
        
        const dish = await Dish.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true, runValidators: true }
        );
        if (!dish) return res.status(404).json({ message: 'Dish not found' });
        res.json(dish);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete dish (admin only)
exports.deleteDish = async (req, res) => {
    try {
        const dish = await Dish.findByIdAndDelete(req.params.id);
        if (!dish) return res.status(404).json({ message: 'Dish not found' });
        res.json({ message: 'Dish deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};