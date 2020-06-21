const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectId;
const router = require('express').Router();
const Product = mongoose.model('Product');
const ProductVisit = mongoose.model('ProductVisit');
const auth = require('../middleware/auth');

router.get('/:product_id', (req, res, _next) => {
  return Product.findOne({ productId: req.params.product_id }).then(product => {
    return res.json({product});
  })
});

router.post('/', auth.optional, async (req, res, next) => {
  const existing = await Product.findOne({ productId: req.body.product.productId });
  if (!existing) {
    const product = new Product(req.body.product);
    try {
      await product.save();
      result = {
        product,
      }
      if (req.jwt) {
        const visit = new ProductVisit({
          visitedAt: new Date(),
          productId: product.productId,
          userId: ObjectId(req.jwt.id)
        });
        try {
          await visit.save();
        } catch (e) {
          next(e);
        }
        result.visit = visit;
      }
      return res.json(result);
    } catch (e) {
      next(e);
    }
  } else {
    const updates = req.body.product;
    Object.entries(updates).forEach(([key, value]) => {
      existing[key] = value;
    });
    try {
      await existing.save();
      const result = {
        product: existing,
      };
      if (req.jwt) {
        const visit = new ProductVisit({
          visitedAt: new Date(),
          productId: existing.productId,
          userId: ObjectId(req.jwt.id)
        });
        try {
          await visit.save();
        } catch (e) {
          next(e);
        }
        result.visit = visit;
      }
      return res.json(result);
    } catch (e) {
      next(e);
    }
  }
});

module.exports = router;