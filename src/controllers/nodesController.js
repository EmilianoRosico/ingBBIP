const db = require('../database/models');

module.exports = {
    nodes: async(req, res) => {
        try {
            const nodes = await db.nodes.findAll()
            res.render('../views/nodes', { title: 'Nodos BBIP', nodes: nodes });
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
            console.log(nodeExist);
            if (nodeExist.length == 0) {
                const node = await db.nodes.create({
                    name: req.body.name,
                    cellId: req.body.cellId,
                    province: req.body.province,
                    country: req.body.country,
                    totalRooms: req.body.totalRooms
                })
                console.log(node);
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
            const devices = await db.devices.findAll({ where: { nodesId: req.params.id }, include: [{ association: "nodes" }, { association: "devicemodels" }] })
            res.render('../views/devices', { title: 'Equipamiento BBIP', devices: devices });
        } catch (error) {
            console.log(error)
        }
    }
}