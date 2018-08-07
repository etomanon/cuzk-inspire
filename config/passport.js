const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20')
const uuid = require('uuid')
const User = require('../models/user')
const cipher = require('../helpers/cipher')

passport.serializeUser((user, done) => {
    // add to cookie
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user)
    })
})

passport.use(
    new GoogleStrategy({
        callbackURL: '/api/auth/google/redirect',
        // callbackURL: proxy + '/profile',
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }, (accessToke, refreshToken, profile, done) => {
        User.findOne({
            googleid: profile.id
        })
            .then((currentUser) => {
                if (currentUser) {
                    done(null, currentUser)
                }
                else {
                    const token = uuid.v4();
                    let freeToken = cipher.encrypt(token);
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
                            done(null, newUser)
                        })
                }
            })

    })
)