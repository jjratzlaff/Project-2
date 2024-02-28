var express = require('express');
var router = express.Router();
const tvCtrl = require('../controllers/tv')

router.get('/new', tvCtrl.new)

router.post('/', tvCtrl.create)

module.exports = router;
