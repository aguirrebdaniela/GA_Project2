const User = require('../models/user');
const router = require('express').Router();
const passport = require('passport');
const Trip = require('../models/trips');

// const controller = require('./controller');
const auth = require('../services/auth');

// ----------------------------------------
// users index

router.post(
    '/',
   
    passport.authenticate(
    
        'local-signup', {
            failureRedirect: '/users/new',
            successRedirect: '/users/profile'
        }
    )
);

// ----------------------------------------
// register new user

router.get('/new', (req, res) => {
    res.render('users/new');
});

// ----------------------------------------
// user logout

router.get('/logout', (req, res) => {
    // passport put this method on req for us
    req.logout();
    // redirect back to index page
    res.redirect('/');
});

// ----------------------------------------
// user login

router.get('/login', (req, res) => {
    res.render('users/login');
});

// passport.authenticate will _build_ middleware for us
// based on the 'local-login' strategy we registered with
// passport in auth.js
router.post('/login', passport.authenticate(
    'local-login', {
        failureRedirect: '/users/login',
        successRedirect: '/users/profile'
    }
));


// ----------------------------------------
// user profile

module.exports = router;router.get(
    '/profile',
    // Middleware (that we wrote) ensuring that if the user is not
    // authenticated, he or she will be redirected to the login screen.
    auth.restrict,
    User.findByEmailMiddleware,
    (req, res) => {
        Trip.findAll (req, res, res.locals.userData.id, function () {
        var {trips} = res.locals;
        var cities = new Array()
        for (var i=0; i<trips.length; i++)
        {
            cities.push(trips[i].city)
        }
        console.log(cities)
        res.render('users/profile', 
            { user: res.locals.userData, cities: cities});
       })
       
        
    }
);