const db = require('../database/models');

module.exports = {
    versions: async(req, res) => {
        try {
            const versions = await db.Versions.findAll()
            res.render('../views/versions', { title: 'Versiones BBIP', versions: versions });
        } catch (error) {
            console.log(error)
        }
    },
    addVersion: (req, res) => {
        res.render('../views/addNode', { title: 'Agregar Nodo' });
    },
}