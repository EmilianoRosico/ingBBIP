const { authenticate } = require('ldap-authentication')

async function auth(username, password) {
    // auth with admin
    let options = {
        ldapOpts: {
            url: 'ldap://10.92.55.27:389',
            // tlsOptions: { rejectUnauthorized: false }
        },
        adminDn: 'CN=ciscowaeuser,OU=Servicios,OU=Usuarios de CTI,DC=ctimovil,DC=net',
        adminPassword: 'C1sC0Waeus3r',
        userPassword: password,
        userSearchBase: 'OU=Usuarios de CTI,DC=ctimovil,DC=net',
        usernameAttribute: 'cn',
        username: username,
        // starttls: false
    }
    try {
        let user = await authenticate(options)
            //console.log(user.dn)
        return user.dn
            //Aquí falta crear la validación con user.memberof para asignar diferentes grupos de permisos.

        //Bloque de codigo para extraer del string un objeto. resultado un objeto: { CN: 'CTI7952', OU: 'Usuarios de CTI', DC: 'net' }
        //var properties = user.dn.split(',');
        //var obj = {};
        //properties.forEach(function(property) {
        //    var tup = property.split('=');
        //    obj[tup[0]] = tup[1];
        //});
        //console.log(obj.CN);
    } catch (error) {
        let falla = 'InvalidCredentialsError';
        return falla
    }


}
//, err => { console.log(err); }
//auth('ctia7952', 'Pr0xw4ll#')
module.exports = { auth }