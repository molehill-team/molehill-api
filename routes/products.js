var mongoose = require('mongoose');
var router = require('express').Router();
var Product = mongoose.model('Product');

router.get('/', (_req, res, _next) => {
  return Product.find({}).then(products => res.json({ products }))
});

router.get('/:product_id', (req, res, _next) => {
  return Product.findOne({ productId: req.params.product_id }).then(product => {
    return res.json({product});
  })
});

router.post('/', (req, res, next) => {
  const product = new Product(req.body.product);

  return product.save().then(() => {
    return res.json({product});
  }).catch(next);
});

module.exports = router;