const db = require('../database/models');
const { Op } = require("sequelize");
var request = require('request');

module.exports = {
    nodes: async(req, res) => {
        let totalPages = Math.ceil(await db.nodes.count() / 10);
        let page = Number(req.params.pag == undefined || req.params.pag < 1 || req.params.pag > totalPages ? 1 : req.params.pag)
        try {
            const nodes = await db.nodes.findAll({
                limit: 10,
                offset: (10 * (page - 1)),
                order: [
                    ['name', 'ASC']
                ]
            })
            res.render('../views/nodes', { title: 'Nodos BBIP', nodes: nodes, page: page, totalPages: totalPages });
        } catch (error) {
            console.log(error)
        }
    },
    addNode: (req, res) => {
        res.render('../views/addNode', { title: 'Agregar Nodo' });
    },
    addNodePost: async(req, res) => {
        try {
            const nodeExist = await db.nodes.findAll({ where: { name: req.body.name } })
            if (nodeExist.length == 0 || req.body.name != '') {
                await db.nodes.create({
                    name: req.body.name,
                    cellId: req.body.cellId.toUpperCase(),
                    province: req.body.province,
                    country: req.body.country,
                    totalRooms: req.body.totalRooms
                })
                res.redirect('/nodes')
            } else {
                res.render('somethingWrong', { title: 'SomethingWrong', error: 'El Nodo que desea agregar ya existe!' })
                console.log("************************************************")
                console.log("El nodo " + req.body.name + " ya existe!")
                console.log("************************************************")
            }
        } catch {
            (error => console.log(error))
        }

    },
    nodeDetail: async(req, res) => {
        try {
            const devices = await db.devices.findAll({
                where: { nodesId: req.params.id },
                include: [
                    { association: "nodes" },
                    { association: "devicemodels" }
                ]
            })
            var options = {
                'method': 'GET',
                'url': `http://intraoperativa.claro.amx/intranet/calidad/calidad1/api/wsnoc/sitios/datos/${devices[0].nodes.cellId}`,
                'headers': {
                    'Cookie': 'laravel_session=d8zDeVnPnSj8iUhoOTmQ6LLx4SCOJKl6cNRHGaLL; XSRF-TOKEN=eyJpdiI6IlByZ21ZWHJqM1BlN3NuSktxTytkdWc9PSIsInZhbHVlIjoicWNiZmdPVWVYNVlEOFJONnFObkczT3dMYWxzMmpaYXdhTXhYR214WUg5Y3FHSFd3aDlJYk5uZVl4eHRVbmxOcCIsIm1hYyI6ImQ0OTg2ZTNkNGFiOTllZDUzNGZkNTVhNDgwYWQxM2VjNmZlNDBkODk2NTU2NmY5NGQ5YzU2MDEyNWVhYzNkMmMifQ%3D%3D'
                }
            };
            request(options, function(error, response) {
                if (error) throw new Error(error);
                let data = JSON.parse(response.body);
                data = (data.data.data_arr[0]);
                res.render('../views/nodesDetail', { title: `Equipamiento BBIP en ${devices[0].nodes.name}`, devices: devices, page: 1, totalPages: 1, data: data });
            });
        } catch (error) {
            console.log(error)
        }
    },
    nodesFetch: async(req, res) => {
        try {
            const nodes = await db.nodes.findAll()
            res.send(nodes);
        } catch (error) {
            console.log(error)
        }
    },
}