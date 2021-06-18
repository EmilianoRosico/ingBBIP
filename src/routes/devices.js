var express = require('express');
const devicesController = require('../controllers/devicesController');
var router = express.Router();

router.get('/', devicesController.devices);
router.get('/add', devicesController.add);
router.post('/add', devicesController.addPost);
router.get('/devicesFetch', devicesController.devicesFetch);
router.get('/addSlot', devicesController.addSlotGet);
router.post('/addSlot', devicesController.addSlotPost);
router.post('/addSubSlot', devicesController.addSubSlotPost)
router.get('/edit/:id', devicesController.edit);
router.post('/edit/:id', devicesController.editPost);
router.post('/disable', devicesController.disable);
router.get('/detail/:id', devicesController.detail);
router.post('/edit/port/releasePort', devicesController.releasePort)
router.get('/edit/port/:id', devicesController.editPort);
router.post('/edit/port/:id', devicesController.editPortPost);
router.get('/vlans/:id', devicesController.vlans);
router.get('/addVlan', devicesController.addVlanGet);
router.post('/addVlan', devicesController.addVlanPost);
router.get('/:pag', devicesController.devices);



module.exports = router;