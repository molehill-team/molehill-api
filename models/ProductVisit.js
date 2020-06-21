const mongoose = require('mongoose');

const ProductVisitSchema = new mongoose.Schema({
  'productId': String,
  'visitedAt': {type: Date, index: true},
  'userId': { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
});

mongoose.model('ProductVisit', ProductVisitSchema);