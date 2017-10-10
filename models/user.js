const bcrypt = require('bcryptjs');

const db = require('../models/setup');

const userModelObject = {};

// Note that this is NOT middleware!
userModelObject.create = function create(user) {
    // This is where we obtain the hash of the user's password.
    const passwordDigest = bcrypt.hashSync(user.password, 10);
    return db.oneOrNone(
        'INSERT INTO users (email, password_digest, counter) VALUES ($1, $2, $3) RETURNING *;', [user.email, passwordDigest, 0]
    );
};

// Here's a tricky part.
// We need both a middleware _and_ a nonmiddleware version 
// (nonmiddleware for use in services/auth.js).

// Again, LocalStrategy's interface means it's easiest to return a promise here.
userModelObject.findByEmail = function findByEmail(email) {
    return db.oneOrNone('SELECT * FROM users WHERE email = $1;', [email]);
};

userModelObject.findByEmailMiddleware = function findByEmailMiddleware(req, res, next) {
    console.log('in findByEmailMiddleware');
    const email = req.user.email;
    userModelObject
        .findByEmail(email) // here we're using the nonmiddleware version above, getting back a promise
        .then((userData) => {
            res.locals.userData = userData;
            next();
        }).catch(err => console.log('ERROR:', err));
};

// This section just demonstrates that we can build middleware for the user model 
// and talk to the database as usual. 
// Note that we now have access to req.user for user information, thanks to passport.


module.exports = userModelObject;