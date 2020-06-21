const mongoose = require('mongoose');
const router = require('express').Router();
const ProductVisit = mongoose.model('ProductVisit');
const ObjectId = require('mongodb').ObjectId;
const auth = require('../middleware/auth');

router.get('/history', auth.required, async (req, res, next) => {
  try {
    // TODO: paginate
    const visits = await ProductVisit.find({ userId: ObjectId(req.jwt.id) }).sort({ visitedAt: -1 });
    return res.json({history: visits});
  } catch (e) {
    next(e)
  }
});


module.exports = router;