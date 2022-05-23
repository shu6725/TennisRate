'use strict';
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(
  'postgres://postgres:postgres@db/rate-data'
);

module.exports = {
  sequelize,
  DataTypes
};
