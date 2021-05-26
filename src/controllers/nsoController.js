const db = require('../database/models');
const request = require('request');

module.exports = {
    devices: async(req, res) => {
        try {
            const nodes = await db.nodes.findAll()
            res.render('../views/nodes', { title: 'Nodos BBIP', nodes: nodes });
        } catch {
            (error => console.log(error))
        }


    },
    services: async(req, res) => {
        try {
            const nodes = await db.devices.findAll({
                attributes: ['name']
            })
            var options = {
                'method': 'GET',
                'url': 'http://nso.claro.amx:8080/restconf/data/devices/device-module=ietf-interfaces/devices',
                'headers': {
                    'Content-Type': 'application/yang-patch+json',
                    'Accept': 'application/yang-data+json',
                    'Authorization': 'Basic Y3RpNzk1MjpQcjB4dzRsbA=='
                }
            };
            var devices = {}
            request(options, function(error, response) {
                if (error) { throw new Error(error) };
                devices = JSON.parse(response.body);
                console.log(devices["tailf-ncs:devices"]);
            });
            res.render('../views/nso/services', { title: 'Estado Servicios CORE', nodes: nodes });
        } catch {
            (error => console.log(error))
        }
    },
}