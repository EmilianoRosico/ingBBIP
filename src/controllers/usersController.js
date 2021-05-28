const db = require('../database/models');
const { auth } = require('../ldap-auth')

module.exports = {
    showLogin: async(req, res) => {
        res.render('login', { title: "Login Web Ing BBIP", error: false })
    },
    postLogin: async(req, res) => {
        auth(req.body.username, req.body.password).then(result => {
            console.log(result);
            if (result == 'InvalidCredentialsError') {
                res.render('login', { title: "Login Web Ing BBIP", error: true })
            } else {
                res.redirect('/index')
                    //res.render('login', { title: "Login Web Ing BBIP" })
            }
        }).catch(error => {

            //res.send("Se presento un error" + error)
            //console.log("error:" + error);
        })
    }
}