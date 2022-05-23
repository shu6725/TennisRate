const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Account = require('../models/account');

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, async (email, password, done) => {
  Account.findOne({
    where: {
      email: email
    }
  })
    .then((user) => {
      if (user && (bcrypt.compare(password, user.password_hash))) {
        return done(null, user);  // ログイン成功
      };
      throw new Error();
    })
    .catch(error => { // エラー処理
      console.log("catch error 認証情報エラー")
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