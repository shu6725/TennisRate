'use strict';
const express = require('express');
const Rates = require('../models/rate');

Rates.findAll({
}).then((rates) => {
    console.log(rates)
})