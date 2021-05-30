var express = require('express');
const versionsController = require('../controllers/versionsController');
var router = express.Router();

router.get('/', versionsController.versions);
router.get('/add', versionsController.addVersion);
router.post('/add', versionsController.addVersionPost);
router.get('/page/:pag', versionsController.versions);

module.exports = router;