const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const ProductSchema = new mongoose.Schema({
  'name': String,
  'source': String,
  'rawData': Object,
  'dimensionsInMm': Object,
  'weight': Number,
  'category': String,
  'productId': {type: String, index: true, unique: true},
  'origin': String,
}, {timestamps: true});

ProductSchema.plugin(uniqueValidator, {message: 'already exists'});

mongoose.model('Product', ProductSchema);