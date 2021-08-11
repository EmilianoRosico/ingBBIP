var express = require('express');
const dashboardController = require('../controllers/dashboardController');
var router = express.Router();

router.get('/', dashboardController.dashboard);
router.get('/capex', dashboardController.dashboardCapex);



module.exports = router;