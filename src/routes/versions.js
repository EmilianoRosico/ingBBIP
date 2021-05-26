var express = require('express');
const versionsController = require('../controllers/versionsController');
var router = express.Router();

router.get('/', versionsController.versions);
router.get('/add', versionsController.addVersion);

module.exports = router;