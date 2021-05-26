var request = require('request');
var options = {
    'method': 'GET',
    'url': 'http://nso.claro.amx:8080/restconf/data/devices/device-module=ietf-interfaces/devices',
    'headers': {
        'Content-Type': 'application/yang-patch+json',
        'Accept': 'application/yang-data+json',
        'Authorization': 'Basic Y3RpNzk1MjpQcjB4dzRsbA=='
    }
};

request(options, function(error, response) {
    if (error) throw new Error(error);
    var devices = JSON.parse(response.body);
    console.log(devices["tailf-ncs:devices"]);
});