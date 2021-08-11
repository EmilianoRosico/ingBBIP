const db = require('../database/models');
const sequelize = require('sequelize')


module.exports = {
    dashboard: (req, res) => {
        res.render('../views/dashboards/dashboard', { title: 'Dashboard' });
    },
    dashboardCapex: async(req, res) => {
        const solicitud = await db.capexs.findAll();
        const nodos = await db.capexs.findAll({
            attributes: ['cellId', [sequelize.fn('COUNT', sequelize.col('cellId')), 'result']],
            group: 'cellId',
            order: [
                ['cellId', 'ASC']
            ]
        })
        const areas = await db.capexs.findAll({
            attributes: ['areaSolicitante', [sequelize.fn('COUNT', sequelize.col('areaSolicitante')), 'result']],
            group: 'areaSolicitante',
            order: [
                ['areaSolicitante', 'ASC']
            ]
        })
        const puertosElectricos = await db.capexs.sum('puertosElectricos')
        const puertosOpticos = await db.capexs.sum('puertosOpticos')
        res.render('../views/dashboards/dashboardCapex', {
            title: 'Dashboard',
            solicitud: solicitud,
            nodos: nodos,
            areas: areas,
            puertosElectricos: puertosElectricos,
            puertosOpticos: puertosOpticos
        });
    },
    detail: async(req, res) => {
        const solicitud = await db.capexs.findByPk(req.params.id, { where: { solicitante: res.locals.user } })
        if (solicitud != null) {
            res.render('../views/capex/capexDetail', { title: `Solicitud ${req.params.id}`, solicitud: solicitud });
        } else {
            res.render('somethingWrong', { title: 'SomethingWrong', error: 'Solicitud no generada por su usuario.' })
        }

    },
    postCapex: async(req, res) => {
        try {
            await db.capexs.create({
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
            res.redirect('/capex/capex');

        } catch {
            (error => console.log(error))
        }

    }
}