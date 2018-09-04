// file:app/authentication/init.js
const passport = require('passport')
const bcrypt = require('bcrypt')
const LocalStrategy = require('passport-local').Strategy

const authenticationMiddleware = require('./middleware')

// Generate Password
const saltRounds = 10
const myPlaintextPassword = 'my-password'
const salt = bcrypt.genSaltSync(saltRounds)
const passwordHash = bcrypt.hashSync(myPlaintextPassword, salt)

const user = {
    username: 'test-user',
    passwordHash,
    id: 1
}

function findUser (username, callback) {
    if (username == user.username) {
        return callback(null, username)
    }
    return callback(null)
}

passport.serializeUser(function (username, cb) {
    cb(null, username)
})

passport.deserializeUser(function (username, cb) {
    findUser(username, cb)
})

function initPassport () {
    passport.use(new LocalStrategy((username, password, done) => {
        findUser(username, (err, user) => {
            if (err) {
                return done(err)
            }

            // user not found
            if (!user) {
                return done(null, false)
            }

            // always use hashed passwords and fixed time comparisons
            bcrypt.compare(password, user.passwordHash, (err, isValid) => {
                if (err) {
                    return done(err)
                }

                if (!isValid) {
                    return done(null, false)
                }

                return done(null, user)
            })
        })
    }))
    passport.authenticationMiddleware = authenticationMiddleware
}

module.exports = initPassport