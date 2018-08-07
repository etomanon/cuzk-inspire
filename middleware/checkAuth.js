module.exports = (req, res, next) => {
    if(!req.user) {
        // res.redirect('/api/auth/login')
        res.json({ message: "no user" })
    }
    else {
        next()
    }
}