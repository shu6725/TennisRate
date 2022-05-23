'use strict';
const express = require('express');
const router = express.Router();
const authenticationEnsurer = require('./authentication-ensurer');
const bcrypt = require('bcrypt');

const Account = require('../models/account');
const User = require('../models/user');

router.get('/', (req, res, next) => {
    res.render('register', { user: req.user });
});

router.post('/', (req, res, next) => {
    (async () => {
        console.log(req.body)
        const password_hash = await bcrypt.hash(req.body.password, 10)
        // Todo email addressがすでに使われてないか
        // update Rate table
        Account.create({
            username: req.body.username,
            email: req.body.email,
            password_hash: password_hash
        })
        User.create({
            username: req.body.username,
            rate: 1500
        })
        // await console.log('winner new rate ha ', new_winner_rate, 'losers new rate ha ', new_loser_rate)
    })().then(() => {
        res.redirect('/');
    })
});

module.exports = router;