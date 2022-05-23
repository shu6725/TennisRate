'use strict';
const express = require('express');
const Rates = require('../models/rate');

const date = new Date();
date.setDate(date.getDate() + 1);

const formatDate = (date) => {
    let formatted_date = date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear()
    return formatted_date;
}
console.log(formatDate(date));

Rates.upsert({
    userId: 342698,
    last_date: date,
    rate: 1690
});