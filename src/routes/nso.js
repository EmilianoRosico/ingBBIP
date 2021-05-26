var express = require('express');
const nsoController = require('../controllers/nsoController');
var router = express.Router();

router.get('/devices', nsoController.devices);
router.get('/services', nsoController.services);



module.exports = router;