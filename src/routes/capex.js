var express = require('express');
const capexController = require('../controllers/capexController');
var router = express.Router();

router.get('/', capexController.view);
//Rutas que permiten la carga de nuevas solicitudes de capex.
//router.get('/addCapex', capexController.addCapex);
//router.post('/addCapex', capexController.postCapex);
router.get('/editCapex/:id', capexController.editGet);
router.post('/edit/:id', capexController.editPost);
//Ruta que redirecciona al block por solicitud de capex (mientras este cerrado)
router.get('/addCapex', capexController.addCapexBlock);
//router.get('/editCapex/:id', capexController.addCapexBlock);
//router.post('/edit/:id', capexController.addCapexBlock);

router.get('/:id', capexController.detail);




module.exports = router;