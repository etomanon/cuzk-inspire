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

module.exports = router