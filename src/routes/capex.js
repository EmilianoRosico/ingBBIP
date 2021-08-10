var express = require('express');
const capexController = require('../controllers/capexController');
var router = express.Router();

router.get('/', capexController.view);
router.get('/addCapex', capexController.addCapex);
router.post('/addCapex', capexController.postCapex);
router.get('/:id', capexController.detail)



module.exports = router;