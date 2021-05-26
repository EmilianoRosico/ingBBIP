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
    nodeDetail: async(req, res) => {
        try {
            const devices = await db.devices.findAll({ where: { nodesId: req.params.id }, include: [{ association: "nodes" }, { association: "deviceModels" }] })
            res.render('../views/devices', { title: 'Equipamiento BBIP', devices: devices });
        } catch (error) {
            console.log(error)
        }
    }
}