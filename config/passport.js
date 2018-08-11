const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const User = require('../models/user');
const utils = require('../helpers/utils');

passport.serializeUser((user, done) => {
    // add to cookie
    return done(null, user.id)
})

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        return done(null, user)
    })
})

passport.use(
    new GoogleStrategy({
        callbackURL: '/api/auth/google/redirect',
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }, (accessToke, refreshToken, profile, done) => {
        User.findOne({
            googleid: profile.id
        })
            .then((currentUser) => {
                if (currentUser) {
                    return done(null, currentUser)
                }
                else {
                    utils.createToken()
                    .then(freeToken => {
                        new User({
                            username: profile.displayName,
                            email: profile.emails[0].value,
                            googleid: profile.id,
                            freeToken: freeToken,
                            hits: 0,
                            dateToken: Date.now(),
                        })
                            .save()
                            .then((newUser) => {
                                return done(null, newUser)
                            })
                            .catch(err => {
                                return done(err);
                            })
                    })
                    .catch(err => {
                        return done(err);
                    })
                    
                }
            })

    })
)