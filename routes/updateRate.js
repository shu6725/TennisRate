'use strict';
const express = require('express');
// const router = express.Router();
const User = require('../models/user');
const Rate = require('../models/rate')

const userId = 504433412;
const winnerId = 504433412;
const loserId = 2498796;
const matches_played_winner = 1;
const matches_played_loser = 3;

// 単純なSELECTクエリの例
(async () => {
    // findallでデータを検索
    let users = await User.findAll({
        where: { userId: userId }
    });
    users.map(user => console.log(user.userId, user.username, user.rate));

    const winner = await User.findOne({ where: { userId: winnerId } });
    const loser = await User.findOne({ where: { userId: loserId } });
    var old_elo_winner = await winner.rate;
    var old_elo_loser = await loser.rate;
    var exp_score = await calc_exp_score(old_elo_winner, old_elo_loser)
    winner.rate = await update_elo(old_elo_winner, k_factor(matches_played_winner), 1, exp_score);
    loser.rate = await update_elo(old_elo_loser, k_factor(matches_played_loser), 0, 1 - exp_score);
    // await userJoe.save();
})();

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
    var new_elo = old_elo + k * (actural_score - expected_score)
    return new_elo
}

// createでデータを挿入する例
// const user1 = await User.create({
//     userId: 2498796,
//     username: 'ShogoTerada',
//     rate: 2000
// });


'use strict';
const express = require('express');
// const router = express.Router();
const User = require('../models/user');
// const Rate = require('../models/rate')

const userId = 504433412;
const winnername = 'shu6725';
const losername = 'ueda';
const matches_played_winner = 1;
const matches_played_loser = 3;

// 単純なSELECTクエリの例
(async () => {
    // createでデータを挿入する例
    // const user1 = await User.create({
    //     userId: 2498796,
    //     username: 'ShogoTerada',
    //     rate: 2000
    // });

    // // findallでデータを検索
    // const users = await User.findAll({
    //     // where: { username: 'ueda' }
    // }).then((users) => {
    //     console.log(users)
    // })
    const winner = await User.findOne({ where: { username: winnername } });
    const loser = await User.findOne({ where: { username: losername } });
    var old_elo_winner = await winner.rate;
    var old_elo_loser = await loser.rate;
    var exp_score = await calc_exp_score(old_elo_winner, old_elo_loser)
    winner.rate = await update_elo(old_elo_winner, k_factor(matches_played_winner), 1, exp_score);
    loser.rate = await update_elo(old_elo_loser, k_factor(matches_played_loser), 0, 1 - exp_score);
    await console.log('winner new rate = ', winner.rate, 'losers new rate = ', loser.rate)
})().then(() => {
    User.update({
        userId: winner.userId,
        username: winner.username,
        rate: winner.rate
    });
    User.update({
        userId: loser.userId,
        username: loser.username,
        rate: loser.rate
    });
});

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
    var new_elo = old_elo + k * (actural_score - expected_score)
    return new_elo
}
