'use strict';
const { sequelize, DataTypes } = require('./sequelize-loader');

const Rate = sequelize.define(
    'rates',
    {
        userId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        last_date: {
            type: DataTypes.DATE,
            allowNull: true
        },
        rate: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    },
    {
        uniqueKeys: {
            UsersWorkspacesIndex: {
                fields: ['userId', 'last_date']
            }
        }
    },
    {
        freezeTableName: true,
        timestamps: false
    }
);

module.exports = Rate;

