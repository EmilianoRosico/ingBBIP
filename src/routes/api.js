var express = require('express');
const apiController = require('../controllers/apiController');
var router = express.Router();

router.get('/capexData', apiController.capexData);
router.get('/capexDatatoXLS', apiController.capexDatatoXLS);




module.exports = router;