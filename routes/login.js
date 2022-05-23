'use strict';
const express = require('express');
const passport = require('./auth.js');
const router = express.Router();


router.get('/', (req, res, next) => {
  res.render('login');
  // res.render('login', { user: req.user });
});

router.post('/',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true,
    badRequestMessage: '「メールアドレス」と「パスワード」は必須入力です。'
  })
);

module.exports = router;
