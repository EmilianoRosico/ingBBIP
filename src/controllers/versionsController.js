const db = require('../database/models');

module.exports = {
    versions: async(req, res) => {
        let totalPages = Math.ceil(await db.versions.count() / 10);
        let page = Number(req.params.pag == undefined || req.params.pag < 1 || req.params.pag > totalPages ? 1 : req.params.pag)
        try {
            const versions = await db.versions.findAll({
                limit: 10,
                offset: (10 * (page - 1)),
                order: [
                    ['name', 'ASC']
                ],
                include: [
                    { association: "versiontorole" },
                    { association: "versiondevicemodels" }
                ]
            })
            res.render('../views/versions', { title: 'Versiones BBIP', versions: versions, page: page, totalPages: totalPages });
        } catch (error) {
            console.log(error)
        }
    },
    addVersion: async(req, res) => {
        try {
            const model = await db.devicemodels.findAll();
            const role = await db.deviceroles.findAll();
            res.render('../views/addVersion', { title: 'Agregar Nodo', model: model, role: role });
        } catch (error) {
            console.log(error);
        }

    },
    addVersionPost: async(req, res) => {
        try {
            const versionExist = await db.versions.findAll({ where: { name: req.body.name } })
            if (versionExist.length == 0 || req.body.name != '') {
                await db.versions.create({
                    name: req.body.name.toUpperCase(),
                    servicePack: req.body.servicePack.toUpperCase(),
                    smuPatch: req.body.smuPatch,
                    psrrLink: req.body.psrrLink,
                    forRoleId: req.body.forRoleId,
                    forModelId: req.body.forModelId
                })
                res.redirect('/versions')
            } else {
                res.render('somethingWrong', { title: 'SomethingWrong', error: 'La versión que desea agregar ya existe!' })
                console.log("************************************************")
                console.log("La versión " + req.body.name + " ya existe!")
                console.log("************************************************")
            }
        } catch {
            (error => console.log(error))
        }

    },
}