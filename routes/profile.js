const router = require('express').Router()
const checkAuth = require('../middleware/checkAuth')
const uuid = require('uuid')
const User = require('../models/user')
const cipher = require('../helpers/cipher')

router.get('/', checkAuth, (req, res) => {
    const freeToken = cipher.decrypt(req.user.freeToken);
    res.status(200).json({
        user: req.user.username,
        email: req.user.email,
        freeToken: freeToken,
        hits: req.user.hits,
        dateToken: req.user.dateToken,
        format: req.user.format,
        srs: req.user.srs
    })
})

router.post('/token', checkAuth, (req, res) => {
    User.findOne({ 'email': req.user.email, 'username': req.user.username })
        .exec()
        .then(result => {
            const token = uuid.v4();
            let freeToken = cipher.encrypt(token);
            result.freeToken = freeToken;
            result.save();
            res.status(200).json({
                token
            });
        })
        .catch(err => {
            res.status(500).send({
                error: err.message
            });
        })
})

router.post('/format', checkAuth, (req, res) => {
    User.findOne({ 'email': req.user.email, 'username': req.user.username })
        .exec()
        .then(result => {
            let format = req.body.format;
            result.format = format;
            result.save();
            res.status(200).json({
                format
            });
        })
        .catch(err => {
            res.status(500).send({
                error: err.message
            });
        })
})

router.post('/srs', checkAuth, (req, res) => {
    User.findOne({ 'email': req.user.email, 'username': req.user.username })
        .exec()
        .then(result => {
            let srs = req.body.srs;
            result.srs = srs;
            result.save();
            res.status(200).json({
                srs
            });
        })
        .catch(err => {
            res.status(500).send({
                error: err.message
            });
        })
})

module.exports = router;