module.exports = (req, res, next) => {
    if(!req.user) {
        // res.redirect('/api/auth/google')
        res.status(401).json({})
    }
    else {
        next()
    }
}