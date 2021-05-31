module.exports = (req, res, next) => {
    if (!req.session.user) {
        res.redirect('/users')
    } else {
        res.locals.user = req.session.user
        next()
    }
}