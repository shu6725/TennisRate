'use strict';
const Users = require('../models/user');

Users.findAll({
}).then((rates) => {
    console.log(rates)
})