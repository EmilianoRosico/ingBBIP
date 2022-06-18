const db = require('../database/models');


module.exports = {
    view: async (req, res) => {
        const solicitud = await db.capexs.findAll({ where: { solicitante: res.locals.user } });
        res.render('../views/capex/capex', { title: 'Solicitud CAPEX', solicitud: solicitud });
    },
    detail: async (req, res) => {
        const solicitud = await db.capexs.findByPk(req.params.id)
        if (solicitud != null) {
            res.render('../views/capex/capexDetail', { title: `Solicitud ${req.params.id}`, solicitud: solicitud });
        } else {
            res.render('somethingWrong', { title: 'SomethingWrong', error: 'Solicitud no generada por su usuario.' })
        }

    },
    addCapex: (req, res) => {
        res.render('../views/capex/addCapex', { title: 'Nueva solicitud CAPEX' });
    },
    addCapexBlock: (req, res) => {
        res.render('somethingWrong', { title: 'SomethingWrong', error: 'Vencido el tiempo de solicitudes.' })
    },
    postCapex: async (req, res) => {
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
                puertosOpticos1gb: req.body.puertosOpticos1gb,
                puertosOpticos10gb: req.body.puertosOpticos10gb,
                puertosOpticos100gb: req.body.puertosOpticos100gb,
                comentarios: req.body.comentarios,
            })
            res.redirect('/capex');

        } catch {
            (error => console.log(error))
        }
    },
    editGet: async (req, res) => {
        try {
            const solicitud = await db.capexs.findOne({ where: { id: req.params.id, solicitante: res.locals.user } })
            if (solicitud != null) {
                res.render('../views/capex/editCapex', { title: `Solicitud ${req.params.id}`, solicitud: solicitud });
            } else {
                res.render('somethingWrong', { title: 'SomethingWrong', error: 'Solicitud no generada por su usuario.' })
            }
        } catch {
            (error => console.log(error))
        }
    },
    editPost: async (req, res) => {
        try {
            const solicitud = await db.capexs.findOne({ where: { id: req.params.id, solicitante: res.locals.user } })
            if (solicitud != null) {
                await db.capexs.update({
                    solicitante: res.locals.user,
                    tituloProyecto: req.body.tituloProyecto,
                    areaSolicitante: req.body.areaSolicitante,
                    requerimiento: req.body.requerimiento,
                    cellId: req.body.cellId.toUpperCase(),
                    fechaObjetivo: req.body.fechaObjetivo,
                    redundancia: req.body.redundancia,
                    bandwidth: req.body.bandwidth,
                    puertosElectricos: req.body.puertosElectricos,
                    puertosOpticos1gb: req.body.puertosOpticos1gb,
                    puertosOpticos10gb: req.body.puertosOpticos10gb,
                    puertosOpticos100gb: req.body.puertosOpticos100gb,
                    comentarios: req.body.comentarios,
                }, {
                    where: { id: req.params.id }
                })
                res.redirect('/capex');
            } else {
                res.render('somethingWrong', { title: 'SomethingWrong', error: 'La solicitud a editar NO fue cargada por usted!' })
                console.log("************************************************")
                console.log("La solicitud " + req.params.id + " NO existe!")
                console.log("************************************************")
            }
        } catch {
            (error => console.log(error))
        }
    },
}