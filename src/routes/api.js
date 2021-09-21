var express = require('express');
const apiController = require('../controllers/apiController');
var router = express.Router();

router.get('/capexData', apiController.capexData);




module.exports = router;