var express = require('express');
var router = express.Router();
const tvCtrl = require('../controllers/tv')
const isLoggedIn = require('../config/auth');

router.get('/', tvCtrl.index)

router.get('/new', isLoggedIn, tvCtrl.new)


router.get('/:id', tvCtrl.show);

router.post('/', isLoggedIn, tvCtrl.create)

module.exports = router;

