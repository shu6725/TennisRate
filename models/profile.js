'use strict';
const { sequelize, DataTypes } = require('./sequelize-loader');

const Profile = sequelize.define(
    'profiles',
    {
        userId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        imagePath: {
            type: DataTypes.STRING,
            allowNull: true
        }
    },
    {
        freezeTableName: true,
        timestamps: false
    }
);

module.exports = Profile;