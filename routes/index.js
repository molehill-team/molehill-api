var router = require('express').Router();

router.use('/api/users', require('./users'));
router.use('/api/products', require('./products'));
router.use('/api/product_visits', require('./product_visits'));

router.use((err, req, res, next) => {
  if(err.name === 'ValidationError'){
    return res.status(422).json({
      errors: Object.keys(err.errors).reduce(function(errors, key){
        errors[key] = err.errors[key].message;

        return errors;
      }, {})
    });
  }

  return next(err);
});

module.exports = router;