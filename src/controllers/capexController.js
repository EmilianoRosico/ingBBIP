const db = require('../database/models');
const { Op } = require("sequelize");
var request = require('request');

module.exports = {
    view: async (req, res) => {
        const solicitud = await db.capexs.findAll({ where: { solicitante: res.locals.user } });
        res.render('../views/capex', { title: 'Solicitud CAPEX', solicitud: solicitud });
    },
    addCapex: (req, res) => {
        res.render('../views/addCapex', { title: 'Nueva solicitud CAPEX' });
    },
    postCapex: async(req, res) => {
        try {
                const solicitud = await db.capexs.create({
                    solicitante: res.locals.user,
                    tituloProyecto: req.body.tituloProyecto,
                    areaSolicitante: req.body.areaSolicitante,
                    requerimiento: req.body.requerimiento,
                    cellId: req.body.cellId.toUpperCase(),
                    fechaObjetivo: req.body.fechaObjetivo,
                    redundancia: req.body.redundancia,
                    bandwidth: req.body.bandwidth,
                    puertosElectricos: req.body.puertosElectricos,
                    puertosOpticos: req.body.puertosOpticos,
                    capacidadPuerto: req.body.capacidadPuerto,
                    comentarios: req.body.comentarios,
                })
                res.redirect('/capex');

        } catch {
            (error => console.log(error))
        }

    },
}