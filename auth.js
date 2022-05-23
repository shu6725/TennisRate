const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const passport = require('./routes/auth');
const LocalStrategy = require('passport-local').Strategy;
const Account = require('./models/account');

passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
}, (username, password, done) => {
    console.log('username', username, 'password', password)
    Account.findOne({
        where: {
            username: username
        }
    })
        .then(user => {

            if (user && (bcrypt.hash(password, 10) == user.password_hash)) {

                console.log("login done")

                return done(null, user);  // ログイン成功

            }

            throw new Error();

        })
        .catch(error => { // エラー処理

            return done(null, false, { message: '認証情報と一致するレコードがありません。' });

        });

}));

// Session
passport.serializeUser((user, done) => {

    done(null, user);

});
passport.deserializeUser((user, done) => {

    done(null, user);

});

module.exports = passport;