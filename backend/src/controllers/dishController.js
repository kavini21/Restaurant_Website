const Dish = require('../models/Dish');

exports.createDish = async (req, res, next) => {
  try {
    const dish = await Dish.create(req.body);
    res.status(201).json(dish);
  } catch (err) { next(err); }
};

exports.getDishes = async (req, res, next) => {
  try {
    const dishes = await Dish.find().sort({ createdAt: -1 });
    res.json(dishes);
  } catch (err) { next(err); }
};

exports.getDish = async (req, res, next) => {
  try {
    const dish = await Dish.findById(req.params.id);
    if (!dish) return res.status(404).json({ msg: 'Dish not found' });
    res.json(dish);
  } catch (err) { next(err); }
};

exports.updateDish = async (req, res, next) => {
  try {
    const dish = await Dish.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(dish);
  } catch (err) { next(err); }
};

exports.deleteDish = async (req, res, next) => {
  try {
    await Dish.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Dish deleted' });
  } catch (err) { next(err); }
};
