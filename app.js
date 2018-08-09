require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan'); // logger
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');

const passportSetup = require('./config/passport');

mongoose.connect(process.env.DB_HOST);

// cookies
const sessionOptions = {
    secret: process.env.COOKIE_KEY,
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
};
if(process.env.NODE_ENV === 'production') {
    sessionOptions.cookie = { secure: true };
}
app.use(session(sessionOptions));

// init passport
app.use(passport.initialize());
app.use(passport.session());

// import Routes
const profileRoutes = require('./routes/profile');
const authRoutes = require('./routes/auth');
const adminUnitsRoutes = require('./routes/adminUnits');
const buildingsRoutes = require('./routes/buildings');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', '*');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', `PUT, POST, PATCH, DELETE, 
        GET`);
        return res.status(200).json({});
    }
    next();
})

// Routes to handle requests
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/admin-units', adminUnitsRoutes);
app.use('/api/buildings', buildingsRoutes);

if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, 'client/build')));
    // Handle React routing, return all requests to React app
    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;