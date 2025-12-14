const mongoose = require('mongoose');

const dishSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        enum: ['appetizer', 'main', 'dessert', 'drink'],
        required: true
    },
    image: {
        url: String,
        public_id: String
    },
    ingredients: [String],
    isFeatured: {
        type: Boolean,
        default: false
    },
    available: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Dish', dishSchema);