'use strict';
const express = require('express');
const router = express.Router();
const authenticationEnsurer = require('./authentication-ensurer');
const uuid = require('uuid');
const User = require('../models/user');
const Rate = require('../models/rate');

router.get('/', (req, res, next) => {
    res.render('result', { user: req.user });
});

router.post('/', authenticationEnsurer, (req, res, next) => {
    (async () => {
        const player0 = await User.findOne({ where: { username: req.user.username } });
        const player1 = await User.findOne({ where: { username: req.body.opponentName } });
        const matches_played_winner = 10;
        const matches_played_loser = 10;
        const date = new Date();
        if (req.body.winnerScore > req.body.loserScore) {
            //Player0の勝ち、player1の負け
            var old_elo_winner = await player0.rate;
            var old_elo_loser = await player1.rate;
            var exp_score = await calc_exp_score(old_elo_winner, old_elo_loser);
            player0.rate = await update_elo(old_elo_winner, k_factor(matches_played_winner), 1, exp_score);
            player1.rate = await update_elo(old_elo_loser, k_factor(matches_played_loser), 0, 1 - exp_score);
            player0.save();
            player1.save();
        } else {
            //Player0の負け、player1の勝ち
            var old_elo_winner = await player1.rate;
            var old_elo_loser = await player0.rate;
            var exp_score = await calc_exp_score(old_elo_winner, old_elo_loser);
            player1.rate = await update_elo(old_elo_winner, k_factor(matches_played_winner), 1, exp_score);
            player0.rate = await update_elo(old_elo_loser, k_factor(matches_played_loser), 0, 1 - exp_score);
            player0.save();
            player1.save();
        };
        // update Rate table
        Rate.upsert({
            userId: player0.id,
            last_date: date,
            rate: player0.rate
        })
        Rate.upsert({
            userId: player1.id,
            last_date: date,
            rate: player1.rate
        })
        // await console.log('winner new rate ha ', new_winner_rate, 'losers new rate ha ', new_loser_rate)
    })().then(() => {
        res.redirect('/results');
    })
});

module.exports = router;

//define k factor assumptions
function k_factor(matches_played) {
    var K = 250
    var offset = 5
    var shape = 0.4
    return K / (matches_played + offset) ** shape
};

function calc_exp_score(playerA_rate, playerB_rate) {
    return 1 / (1 + (10 ** ((playerB_rate - playerA_rate) / 400)))
};

function update_elo(old_elo, k, actural_score, expected_score) {
    var new_elo = parseInt(old_elo + k * (actural_score - expected_score))
    return new_elo
};