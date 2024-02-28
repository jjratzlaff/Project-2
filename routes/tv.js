var express = require('express');
var router = express.Router();
const tvCtrl = require('../controllers/tv')


router.get('/', tvCtrl.index)

router.get('/new', tvCtrl.new)


router.get('/:id', tvCtrl.show);

router.post('/', tvCtrl.create)

module.exports = router;

