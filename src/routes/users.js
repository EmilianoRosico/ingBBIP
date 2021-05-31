var express = require('express');
var usersController = require('../controllers/usersController')
var router = express.Router();

/* GET users listing. */
router.get('/', usersController.showLogin);
router.post('/', usersController.postLogin);
router.get('/logout', usersController.logout)

module.exports = router;