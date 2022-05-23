'use strict';
const Account = require('../models/account');

// Account.findAll({
// }).then((rates) => {
//     console.log(rates)
// })

Account.findOne({
    where: {
        username: 'shugo'
    },
}).then((rates) => {
    console.log(rates)
})