const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const ProductSchema = new mongoose.Schema({
  'name': String,
  'source': String,
  'rawData': Object,
  'dimensions_mm': Object,
  'weight_g': Number,
  'category': String,
  'productId': {type: String, index: true, unique: true},
  'originLocation': String,
  'sourceURL': String,
}, {timestamps: true});

ProductSchema.plugin(uniqueValidator, {message: 'already exists'});

mongoose.model('Product', ProductSchema);