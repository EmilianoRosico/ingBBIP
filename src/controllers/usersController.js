const { auth } = require('../ldap-auth');
const fs = require('fs');

module.exports = {
    showLogin: (req, res) => {
        res.render('login', { title: "Login Web Ing BBIP", error: false });
    },
    postLogin: (req, res) => {
        auth(req.body.username, req.body.password).then(result => {
            if (result == 'InvalidCredentialsError') {
                res.render('login', { title: "Login Web Ing BBIP", error: true });
            } else {
                var properties = result.split(',');
                var obj = {};
                properties.forEach(function(property) {
                    var tup = property.split('=');
                    obj[tup[0]] = tup[1];
                });
                req.session.user = obj.CN
                var message = new Date().toISOString() + " : " + req.session.user + " logged in.\n";
                var loginStream = fs.createWriteStream("./src/Logs/logins.log", { 'flags': 'a' });
                loginStream.write(message)

                res.redirect('/index')
            }
        }).catch(error => {
            console.log("error:" + error);
        })
    },
    logout: (req, res) => {
        var message = new Date().toISOString() + " : " + req.session.user + " logged out.\n";
        var loginStream = fs.createWriteStream("./src/Logs/logins.log", { 'flags': 'a' });
        loginStream.write(message)
        req.session.destroy(function(err) {
            // cannot access session here
        })
        res.redirect('/')
    },
}