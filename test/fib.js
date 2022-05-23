'use strict';
function fib(n) {
    if (n === 0) {
        return 0;
    } else if (n === 1) {
        return 1;
    }
    return fib(n - 1) + fib(n - 2);
};

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

const length = 3;
for (let i = 0; i <= length; i++) {
    console.log('i ' + i + ' k ' + k_factor(i));
}

console.log(calc_exp_score(1600, 1200) + '  exp score')
console.log(update_elo(1500, 100, 1, 0.8) + '  new elo')