const db = require('../database/models');


module.exports = {
    view: async(req, res) => {
        const solicitud = await db.capexs.findAll({ where: { solicitante: res.locals.user } });
        res.render('../views/capex/capex', { title: 'Solicitud CAPEX', solicitud: solicitud });
    },
    detail: async(req, res) => {
        const solicitud = await db.capexs.findByPk(req.params.id, { where: { solicitante: res.locals.user } })
        if (solicitud != null) {
            res.render('../views/capex/capexDetail', { title: `Solicitud ${req.params.id}`, solicitud: solicitud });
        } else {
            res.render('somethingWrong', { title: 'SomethingWrong', error: 'Solicitud no generada por su usuario.' })
        }

    },
    addCapex: (req, res) => {
        res.render('../views/capex/addCapex', { title: 'Nueva solicitud CAPEX' });
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

    },
}