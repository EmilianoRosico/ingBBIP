var express = require('express');
var usersController = require('../controllers/usersController')
var router = express.Router();

/* GET users listing. */
router.get('/', usersController.showLogin);
router.post('/', usersController.postLogin);

module.exports = router;