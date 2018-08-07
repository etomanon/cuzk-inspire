module.exports = (req, res, next) => {
    if(req.get('admin-auth') !== process.env.ADMIN_KEY) {
        return res.status(403).json({
            message: 'permission denied'
        })
    }
    else {
        next()
    }
}