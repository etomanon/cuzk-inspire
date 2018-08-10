const router = require('express').Router();
const passport = require('passport');

router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
})
)

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');  
})

router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    res.redirect('/profile');  
})

router.get('/check', (req, res) => {
    if(!req.user) {
        res.status(200).json({auth: false, error: true})
    }
    else {
        res.status(200).json({auth: true, error: false})
    }
})

module.exports = router