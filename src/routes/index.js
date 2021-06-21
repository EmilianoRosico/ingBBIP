var express = require('express');
var router = express.Router();
const db = require('../database/models');
const { Op } = require("sequelize");

/* GET home page. */
router.get('/', (req, res) => {
    res.redirect('/users')
})
router.get('/index', function(req, res, next) {
    res.render('index', { title: 'Express' });
});
router.get('/somethingWrong', (req, res) => {
    res.render('somethingWrong', { title: 'Algo salio mal!', error: undefined })
})

//BUSCADOR
router.get('/search', async(req, res) => {
    if (req.query.search != "") {
        try {
            const devices = await db.devices.findAll({
                where: {
                    name: {
                        [Op.like]: `%${req.query.search}%`
                    }
                },
                include: [
                    { association: "nodes" },
                    { association: "devicemodels" }
                ],
                order: [
                    ['name', 'ASC']
                ]
            })
            const nodes = await db.nodes.findAll({
                where: {
                    name: {
                        [Op.like]: `%${req.query.search}%`
                    }
                },
                order: [
                    ['name', 'ASC']
                ]
            })
            const versions = await db.versions.findAll({
                where: {
                    name: {
                        [Op.like]: `%${req.query.search}%`
                    }
                },
                order: [
                    ['name', 'ASC']
                ],
                include: [
                    { association: "versiontorole" },
                    { association: "versiondevicemodels" }
                ]
            })
            res.render('../views/searchResult', { title: `Resultados de la busqueda ${req.query.search}`, devices: devices, nodes: nodes, versions: versions });
        } catch (error) {
            console.log(error)
        }
    } else {
        res.render('../views/searchResult', { title: `Debe especificar el parametro que desea buscar...`, devices: [], nodes: [], versions: [] });
    }

})

module.exports = router;