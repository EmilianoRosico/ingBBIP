var express = require('express');
const nodesController = require('../controllers/nodesController');
var router = express.Router();

router.get('/', nodesController.nodes);
router.get('/add', nodesController.addNode);
router.post('/add', nodesController.addNodePost);
router.get('/:id', nodesController.nodeDetail)


module.exports = router;