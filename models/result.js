'use strict';
const { sequelize, DataTypes } = require('./sequelize-loader');

const Result = sequelize.define(
    'results',
    {
        matchId: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            primaryKey: false,
            allowNull: false
        },
        matchType: {
            type: DataTypes.STRING,
            allowNull: false
        },
        winnerScore: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        loserScore: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        freezeTableName: true,
        timestamps: false,
    }
);

module.exports = Result;
