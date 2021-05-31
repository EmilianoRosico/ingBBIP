const { auth } = require('../ldap-auth')

module.exports = {
    showLogin: (req, res) => {
        res.render('login', { title: "Login Web Ing BBIP", error: false })
    },
    postLogin: (req, res) => {
        auth(req.body.username, req.body.password).then(result => {
            if (result == 'InvalidCredentialsError') {
                res.render('login', { title: "Login Web Ing BBIP", error: true })
            } else {
                var properties = result.split(',');
                var obj = {};
                properties.forEach(function(property) {
                    var tup = property.split('=');
                    obj[tup[0]] = tup[1];
                });
                req.session.user = obj.CN
                res.redirect('/index')
            }
        }).catch(error => {
            console.log("error:" + error);
        })
    }
}