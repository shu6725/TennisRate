'use strict';
const { sequelize, DataTypes } = require('./sequelize-loader');

const updatedAt = new Date();
const Rate = sequelize.define(
    'rates',
    {
        userId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        date: {
            type: DataTypes.DATE,
            primaryKey: true,
            allowNull: false
        },
        rate: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    },
    {
        freezeTableName: true,
        timestamps: false
    }
);

module.exports = Profile;