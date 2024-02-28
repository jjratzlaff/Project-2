const express = require('express');
const router = express.Router();
const performersCtrl = require('../controllers/performers');

router.get('/performers/new', performersCtrl.new);
router.post('/performers', performersCtrl.create);
router.post('/tv/:tvId/performers', performersCtrl.addToCast);

module.exports = router;