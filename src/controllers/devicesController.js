const db = require('../database/models');
const Swal = require('sweetalert2')

module.exports = {
    devices: async(req, res) => {
        //Manejo del paginado
        let page = req.params.pag == undefined ? 1 : req.params.pag
        let offset = req.params.offset == undefined ? 10 : req.params.offset
        try {
            const devices = await db.devices.findAll({ limit: 10, offset: (offset * (page - 1)), include: [{ association: "nodes" }, { association: "devicemodels" }] })
            res.render('../views/devices', { title: 'Equipamiento BBIP', devices: devices });
        } catch {
            (error => console.log(error))
        }

    },
    add: async(req, res) => {

        try {
            const nodes = await db.nodes.findAll();
            const version = await db.versions.findAll();
            const model = await db.devicemodels.findAll();
            const role = await db.deviceroles.findAll();
            res.render('../views/addDevice', { title: 'Agregar Equipamiento', nodes: nodes, version: version, model: model, role: role });
        } catch {
            (error => console.log(error))
        }
    },
    addPost: async(req, res) => {

        try {
            const nodeExist = await db.devices.findAll({ where: { name: req.body.name } })
            if (nodeExist.length == 0) {
                const node = await db.devices.create({
                    name: req.body.name,
                    status: req.body.status,
                    roleId: req.body.role,
                    modelsId: req.body.model,
                    nodesId: req.body.node,
                    nsoLicense: req.body.licenseNSO == 'on' ? 1 : 0,
                    ipMgmt: req.body.ipMgmt,
                    ipIgp: req.body.ipIGP,
                    room: req.body.room,
                    row: req.body.row,
                    rack: req.body.rack,
                    rackUnit: req.body.rackUnit,
                    hierarchy: req.body.hierarchy,
                    virtual: req.body.virtual == 'on' ? 1 : 0,
                    VersionId: req.body.version
                })
                res.redirect('/devices/detail/' + node.id)
            } else {
                res.redirect('/devices')
                console.log("************************************************")
                console.log("El dispositivo " + req.body.name + " ya existe!")
                console.log("************************************************")
            }
        } catch {
            (error => console.log(error))
        }

    },
    edit: async(req, res) => {
        try {
            const device = await db.devices.findByPk(req.params.id)
            if (device != null) {
                const nodes = await db.nodes.findAll();
                const version = await db.versions.findAll();
                const model = await db.devicemodels.findAll();
                const role = await db.deviceroles.findAll();
                res.render('../views/editDevice', { title: 'Editar ' + device.name, device: device, nodes: nodes, version: version, model: model, role: role });
            } else {
                console.log('***************************************');
                console.log('Se intenta editar un ID que no existe!');
                console.log('***************************************');
                res.redirect('/devices');
            }
        } catch {
            (error => console.log(error))
        }
    },
    editPost: async(req, res) => {

        try {
            const nodeExist = await db.devices.findByPk(req.params.id)
            if (nodeExist != null) {
                await db.devices.update({
                    name: req.body.name,
                    status: req.body.status,
                    roleId: req.body.role,
                    modelsId: req.body.model,
                    nodesId: req.body.node,
                    nsoLicense: req.body.licenseNSO == 'on' ? 1 : 0,
                    ipMgmt: req.body.ipMgmt,
                    ipIgp: req.body.ipIGP,
                    room: req.body.room,
                    row: req.body.row,
                    rack: req.body.rack,
                    rackUnit: req.body.rackUnit,
                    hierarchy: req.body.hierarchy,
                    virtual: req.body.virtual == 'on' ? 1 : 0,
                    VersionId: req.body.version
                }, {
                    where: { id: req.params.id }
                })
                res.redirect('/devices')
            } else {
                res.redirect('/devices')
                console.log("************************************************")
                console.log("El dispositivo " + req.body.name + " NO existe!")
                console.log("************************************************")
            }
        } catch {
            (error => console.log(error))
        }
    },
    disable: async(req, res) => {
        try {
            const nodeExist = await db.devices.findByPk(req.body.id)
            if (nodeExist != null) {
                await db.devices.destroy({
                    where: { id: req.body.id }
                })
                res.redirect('/devices')
            } else {
                res.redirect('/devices')
                console.log("************************************************")
                console.log("El dispositivo " + req.body.name + " NO existe!")
                console.log("************************************************")
            }
        } catch (error) {
            console.log(error)
        }
    },
    //Genera consultas a la DB para mostrar la información de un DEVICE. Slots filtra los slots existentes en el DEVICE.
    detail: async(req, res) => {
        try {
            const device = await db.devices.findOne({ where: { id: req.params.id }, include: [{ association: "nodes" }, { association: "devicemodels" }] })
            const slots = await db.ports.findAll({ where: { deviceId: req.params.id }, attributes: ['slot'], group: 'slot' })
            const ports = await db.ports.findAll({
                where: { deviceId: req.params.id },
                order: [
                    ['subslot', 'ASC'],
                    ['port', 'ASC']
                ]
            })
            res.render('../views/deviceDetail', { title: 'Detalle Equipamiento', device: device, ports: ports, slots: slots });
        } catch {
            (error => console.log(error))
        }
    },
    editPort: async(req, res) => {
        try {
            const port = await db.ports.findByPk(req.params.id)
            if (port != null) {
                res.render('../views/editDevicePort', { title: 'Edición Puerto', port: port });
            } else {
                console.log('***************************************');
                console.log('Se intenta editar un ID que no existe!');
                console.log('***************************************');
                res.redirect('/devices');
            }
        } catch {
            (error => console.log(error))
        }
    },
    editPortPost: async(req, res) => {
        try {
            const port = await db.ports.findByPk(req.params.id)
            if (port != null) {
                await db.ports.update({
                    project: req.body.project,
                    status: req.body.status,
                    license: req.body.license == 'on' ? 1 : 0,
                    boardModule: req.body.boardModule,
                    espejado: req.body.espejado,
                    clientSide: req.body.clientSide,
                    editedByUser: "Emi Edit",

                }, {
                    where: { id: req.params.id }
                })
                res.render('../views/editDevicePortConfirm', { title: "Se salvo cambio" })
            } else {
                res.redirect('../views/error')
                console.log("************************************************")
                console.log("El dispositivo " + req.body.name + " NO existe!")
                console.log("************************************************")
            }
        } catch (error) {
            console.log(error)
        }
    },
    releasePort: async(req, res) => {
        try {
            const port = await db.ports.findByPk(req.body.id)
            if (port != null) {
                await db.ports.update({
                    project: '',
                    status: 'Libre',
                    license: 'No',
                    espejado: '',
                    clientSide: '',
                    editedByUser: "Emi Edit",

                }, {
                    where: { id: req.body.id }
                })
                res.redirect('/devices/detail/' + port.deviceId)
            } else {
                res.redirect('/devices')
                console.log("************************************************")
                console.log("El puerto que desea modificar NO existe!")
                console.log("************************************************")
            }
        } catch (error) {
            console.log(error)
        }
    },

}