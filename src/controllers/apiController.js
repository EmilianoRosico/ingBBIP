const db = require('../database/models');
const sequelize = require('sequelize')


module.exports = {
    capexData: async (req, res) => {
        try {
            const solicitud = await db.capexs.findAll();
            res.send(solicitud);
        } catch (error) {
            console.log(error)
        }
    },
}