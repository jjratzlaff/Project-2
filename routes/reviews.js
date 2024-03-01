const express = require('express')
const router = express.Router();
const reviewsCtrl = require('../controllers/reviews')

router.post('/tv/:id/reviews', reviewsCtrl.create)
router.delete('/reviews/:id', reviewsCtrl.delete)
router.get('/reviews/:id', reviewsCtrl.edit)
router.get('/reviews/:id', reviewsCtrl.update)


module.exports = router;