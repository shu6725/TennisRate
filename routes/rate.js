'use strict';
const express = require('express');
// const router = express.Router();
const User = require('../models/user');
// const Rate = require('../models/rate')
const matches_played_winner = 2;
const matches_played_loser = 1;

router.post('/', (req, res, next) => {
    // 単純なSELECTクエリの例
    (async () => {
        console.log('呼ばれた');
        const player0 = await User.findOne({ where: { username: req.user.username } });
        const player1 = await User.findOne({ where: { username: req.body.opponentName } });
        if (req.body.leftgame > req.body.rightgame) {
            const winner = player0;
            const loser = player1;
            const matches_played_winner = 2;
            const matches_played_loser = 1;
        } else {
            const winner = player1;
            const loser = player0;
            const matches_played_winner = 2;
            const matches_played_loser = 1;
        };
        var old_elo_winner = await winner.rate;
        var old_elo_loser = await loser.rate;
        // var matches_played_winner = await winner.matchNum;
        // var matches_played_loser = await loser.matchNum;
        var exp_score = await calc_exp_score(old_elo_winner, old_elo_loser)
        winner.rate = await update_elo(old_elo_winner, k_factor(matches_played_winner), 1, exp_score);
        loser.rate = await update_elo(old_elo_loser, k_factor(matches_played_loser), 0, 1 - exp_score);
        // await console.log('winner new rate = ', winner.rate, 'losers new rate = ', loser.rate)
    })().then(() => {
        console.log('winner new rate = ', winner.rate, 'losers new rate = ', loser.rate)
        // User.update({
        //     userId: winner.userId,
        //     username: winner.username,
        //     rate: winner.rate
        // });
        // User.update({
        //     userId: loser.userId,
        //     username: loser.username,
        //     rate: loser.rate
        // });
    });
});

//define k factor assumptions
function k_factor(matches_played) {
    var K = 250
    var offset = 5
    var shape = 0.4
    return new promise(K / (matches_played + offset) ** shape)
};

function calc_exp_score(playerA_rate, playerB_rate) {
    return new promise(1 / (1 + (10 ** ((playerB_rate - playerA_rate) / 400))))
};

function update_elo(old_elo, k, actural_score, expected_score) {
    var new_elo = old_elo + k * (actural_score - expected_score)
    return new promise(new_elo)
};
