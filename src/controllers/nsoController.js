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
                    'Authorization': process.env.NSO_AUTH
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
    showTest: (req, res) => {
        res.render('../views/nso/test', { title: 'Test creación NSO' });
    },
    test: async(req, res) => {
        var request = require('request');
        var options = {
            'method': 'PATCH',
            'url': 'http://10.2.205.132:8080/restconf/data/devices/device=TC2471-LAB-01/config/tailf-ned-cisco-ios-xr:interface/Loopback',
            'headers': {
                'Accept': 'application/yang-data+json',
                'Content-Type': 'application/yang-data+json',
                'Authorization': 'Basic YWRtaW46YWRtaW4='
            },
            body: JSON.stringify({ "tailf-ned-cisco-ios-xr:Loopback": { "id": req.body.id, "ipv4": { "address": { "ip": req.body.ip, "mask": req.body.mask } } } })

        };
        request(options, function(error, response) {
            if (error) throw new Error(error);
            console.log(response.body);
        });
        res.send('Se configuro Correctamente.')
    }
}