'use strict';
const express = require('express');
const router = express.Router();
const authenticationEnsurer = require('./authentication-ensurer');
const uuid = require('uuid');
const Result = require('../models/result');


router.get('/', (req, res, next) => {
    res.render('result', { user: req.user });
});

router.post('/', authenticationEnsurer, (req, res, next) => {
    const matchId = uuid.v4();
    Result.create({
        matchId: matchId,
        userId: req.user.id,
        matchType: req.body.matchType,
        winnerScore: req.body.winnerScore,
        loserScore: req.body.loserScore
    }).then(() => {
        res.redirect('/results');
    });
});

module.exports = router;