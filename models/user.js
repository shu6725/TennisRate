'use strict';
const { sequelize, DataTypes } = require('./sequelize-loader');

const User = sequelize.define(
  'users',
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    rate: {
      type: DataTypes.INTEGER,
      defaultValue: 1500
    }
  },
  {
    freezeTableName: true,
    timestamps: false
  }
);

module.exports = User;