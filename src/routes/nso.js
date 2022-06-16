var express = require('express');
const nsoController = require('../controllers/nsoController');
var router = express.Router();

router.get('/devices', nsoController.devices);
router.get('/services', nsoController.services);
router.get('/test', nsoController.showTest);
router.post('/test', nsoController.test);
router.get('/segmentrouting', nsoController.segmentRouting);



module.exports = router;