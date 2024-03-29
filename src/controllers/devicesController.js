const db = require('../database/models');
const { Op } = require("sequelize");
const fs = require('fs');

module.exports = {
    devices: async(req, res) => {
        try {
            //Manejo del filtro por status
            let status = req.query.status == undefined ? 'En Servicio' : req.query.status;
            let totalPages = Math.ceil(await db.devices.count() / 10);
            //Manejo del paginado
            let page = Number(req.params.pag == undefined || req.params.pag < 1 || req.params.pag > totalPages ? 1 : req.params.pag)
            const devices = await db.devices.findAll({
                limit: 10,
                offset: (10 * (page - 1)),
                include: [
                    { association: "nodes" },
                    { association: "devicemodels" }
                ],
                order: [
                    ['name', 'ASC']
                ],
                where: { status: status }
            })
            res.render('devices', { title: 'Equipamiento BBIP', devices: devices, page: page, totalPages: totalPages });
        } catch (error) {
            console.log(error);
            if (error.original.errno == "ECONNREFUSED") {
                res.render('somethingWrong', { title: 'Algo salio mal!', error: "No se puede conectar la base de datos." })
            } else {
                res.render('somethingWrong', { title: 'Algo salio mal!', error: error })
            }
        }
    },
    add: async(req, res) => {
        try {
            const nodes = await db.nodes.findAll({
                order: [
                    ['name', 'ASC']
                ]
            });
            const version = await db.versions.findAll();
            const model = await db.devicemodels.findAll();
            const role = await db.deviceroles.findAll();
            res.render('addDevice', { title: 'Agregar Equipamiento', nodes: nodes, version: version, model: model, role: role });
        } catch (error) {
            console.log(error);
            if (error.original.errno == "ECONNREFUSED") {
                res.render('somethingWrong', { title: 'Algo salio mal!', error: "No se puede conectar la base de datos." })
            } else {
                res.render('somethingWrong', { title: 'Algo salio mal!', error: error })
            }
        }
    },
    addPost: async(req, res) => {
        try {
            const nodeExist = await db.devices.findAll({ where: { name: req.body.name } })
            if (nodeExist.length == 0 || req.body.name == '') {
                const node = await db.devices.create({
                    name: req.body.name.toUpperCase(),
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
                var message = new Date().toISOString() + " : " + req.session.user + " add " + req.body.name + " Device.\n";
                var devicesStream = fs.createWriteStream("./src/Logs/devices.log", { 'flags': 'a' });
                devicesStream.write(message)
                res.redirect('/devices/detail/' + node.id)
            } else {
                res.render('somethingWrong', { title: 'SomethingWrong', error: 'El equipo que desea agregar ya existe!' })
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
            const device = await db.devices.findByPk(req.params.id, {
                include: [
                    { association: "nodes" },
                    { association: "devicemodels" },
                    { association: "deviceroles" }
                ]
            })
            if (device != null) {
                const nodes = await db.nodes.findAll({
                    order: [
                        ['name', 'ASC']
                    ]
                });
                const version = await db.versions.findAll();
                const model = await db.devicemodels.findAll();
                const role = await db.deviceroles.findAll();
                res.render('editDevice', { title: 'Editar ' + device.name, device: device, nodes: nodes, version: version, model: model, role: role });
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
                    name: req.body.name.toUpperCase(),
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
                var message = new Date().toISOString() + " : " + req.session.user + " edit " + req.body.name + " Device.\n";
                var devicesStream = fs.createWriteStream("./src/Logs/devices.log", { 'flags': 'a' });
                devicesStream.write(message)
                res.redirect('/devices')
            } else {
                res.render('somethingWrong', { title: 'SomethingWrong', error: 'El equipo que desea agregar NO existe!' })
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
                var message = new Date().toISOString() + " : " + req.session.user + " delete " + nodeExist.name + " Device.\n";
                var devicesStream = fs.createWriteStream("./src/Logs/devices.log", { 'flags': 'a' });
                devicesStream.write(message)
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
            //Manejo del filtro por status
            let status = req.query.status == undefined ? 'Asignado' : req.query.status;
            let sw = false
            const device = await db.devices.findOne({
                where: { id: req.params.id },
                include: [
                    { association: "nodes" },
                    { association: "devicemodels" },
                    { association: "deviceroles" }
                ]
            })
            const slots = await db.ports.findAll({
                where: { deviceId: req.params.id },
                attributes: ['slot'],
                group: 'slot',
                order: [
                    ['slot', 'ASC']
                ]
            })
            const ports = await db.ports.findAll({
                where: {
                    deviceId: req.params.id,
                    [Op.or]: [
                        { status: status },
                        { status: 'Libre' }
                    ]
                },
                order: [
                    ['subslot', 'ASC'],
                    ['port', 'ASC']
                ]
            })
            if (device.name.slice(5, 9) == '-SW-' || device.name.slice(6, 10) == '-SW-') {
                sw = true
            }
            res.render('deviceDetail', { title: 'Detalle Equipamiento', device: device, ports: ports, slots: slots, sw: sw });
        } catch {
            (error => console.log(error))
        }
    },
    addSlotGet: (req, res) => {
        res.render('addSlot', { title: 'Agregar Slot', id: req.query.id, subSlot: 0 });
    },
    addSlotPost: async(req, res) => {
        if (req.body.subSlot <= 0 || req.body.slot < 0 || req.body.subSlot == undefined) {
            res.redirect('/devices/addSlot?id=' + req.query.id);
        } else {
            res.render('addSlot', { title: 'Agregar Slot', id: req.query.id, slot: req.body.slot, subSlot: req.body.subSlot });
        }
    },
    addSubSlotPost: async(req, res) => {
        try {
            const checkSlotExist = await db.ports.findAll({
                where: {
                    deviceId: req.body.deviceId,
                    slot: req.body.slotAssigned
                },
                attributes: ['slot'],
                group: 'slot'
            })
            if (checkSlotExist.length == 0) {

                //Crea un array que es utilizado para la carga en bulk a la DB.
                let portArray = []
                if (req.body.subSlotAssigned.length == 1) {
                    for (let port = 0; port < req.body.port; port++) {
                        portArray.push({
                            deviceId: req.body.deviceId,
                            status: "Libre",
                            slot: req.body.slotAssigned,
                            subSlot: req.body.subSlotAssigned,
                            boardModule: req.body.boardModule,
                            port: port,
                            project: '',
                            license: 0,
                            espejado: '',
                            clientSide: '',
                            editedByUser: res.locals.user,
                        })
                    }
                } else {
                    for (let i = 0; i < req.body.subSlotAssigned.length; i++) {
                        for (let port = 0; port < req.body.port[i]; port++) {
                            portArray.push({
                                deviceId: req.body.deviceId,
                                status: "Libre",
                                slot: req.body.slotAssigned,
                                subSlot: req.body.subSlotAssigned[i],
                                boardModule: req.body.boardModule[i],
                                port: port,
                                project: '',
                                license: 0,
                                espejado: '',
                                clientSide: '',
                                editedByUser: res.locals.user,
                            })
                        }
                    }
                }
                //Hace una creación en bulk con el array anteriormente creado.
                await db.ports.bulkCreate(portArray)
                res.redirect('/devices/detail/' + req.body.deviceId)
            } else {
                res.redirect('/devices/detail/' + req.body.deviceId)
                console.log("************************************************")
                console.log("El SLOT " + req.body.slotAssigned + " ya existe!")
                console.log("************************************************")
            }
        } catch (error) {
            console.log(error);
            if (error.original.errno == "ECONNREFUSED") {
                res.render('somethingWrong', { title: 'Algo salio mal!', error: "No se puede conectar la base de datos." })
            } else {
                res.render('somethingWrong', { title: 'Algo salio mal!', error: error })
            }
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
                    editedByUser: res.locals.user,
                }, {
                    where: { id: req.params.id }
                })
                res.render('editDevicePortConfirm', { title: "Se salvo cambio" })
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
                    license: 0,
                    espejado: req.body.espejado,
                    clientSide: '',
                    editedByUser: res.locals.user,

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
    vlans: async(req, res) => {
        try {
            const device = await db.devices.findOne({
                where: { id: req.params.id },
                include: [
                    { association: "nodes" },
                    { association: "devicemodels" },
                    { association: "deviceroles" }
                ]
            })
            const vlans = await db.vlans.findAll({
                where: { deviceVlanId: req.params.id },
                order: [
                    ['vlan', 'ASC']
                ]
            })
            res.render('deviceDetailVlans', { title: 'Detalle Equipamiento', device: device, vlans: vlans });
        } catch (error) {
            console.log(vlans);
        }
    },
    addVlanGet: (req, res) => {
        res.render('addVlan', { title: 'Agregar Vlan', id: req.query.id });
    },
    addVlanPost: async(req, res) => {
        if (req.body.vlan >= 1 && req.body.vlan <= 4094) {
            try {
                const checkVlanExist = await db.vlans.findAll({
                    where: {
                        deviceVlanId: req.body.deviceId,
                        vlan: req.body.vlan
                    }
                })
                if (checkVlanExist.length == 0) {
                    const vlan = await db.vlans.create({
                        deviceVlanId: req.body.deviceId,
                        name: req.body.name,
                        vlan: req.body.vlan,
                        editedByUser: res.locals.user,
                    })
                    res.redirect('/devices/vlans/' + req.body.deviceId)
                } else {
                    res.redirect('/devices/detail/' + req.body.deviceId)
                    console.log("************************************************")
                    console.log("La VLAN " + req.body.vlan + " ya existe!")
                    console.log("************************************************")
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            res.render('somethingWrong', { title: "Algo salio mal", error: "El rango de vlan debe ser entre 1 y 4094" })
        }
    },
    devicesFetch: async(req, res) => {
        try {
            const nodes = await db.devices.findAll()
            res.send(nodes);
        } catch (error) {
            console.log(error)
        }
    },
}