const mongoose = require('mongoose');

const DishSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String },
  price: { type: Number, required: true },
  category: { type: String },
  imageUrl: { type: String },
  featured: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Dish', DishSchema);
