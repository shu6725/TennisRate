'use strict';
const { sequelize, DataTypes } = require('./sequelize-loader');
const bcrypt = require('bcrypt');


const Account = sequelize.define(
    'accounts',
    {

        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        password_hash: {
            type: DataTypes.STRING,
        },
    },
    {
        freezeTableName: true,
        timestamps: false
    },
    {
        hooks: {
            beforeCreate: hashPasswordHook,
            beforeUpdate: hashPasswordHook,
        },
        instanceMethods: {
            authenticate: function (password, callback) {
                bcrypt.compare(password, this.password_hash, function (err, isValid) {
                    if (err) {
                        return callback(err);
                    } else {
                        return callback(null, isValid);
                    }
                });
            },
        },
    });

var hashPasswordHook = function (user, options, callback) {

    bcrypt.hash(user.get('password'), 10, function (err, hash) {
        if (err) {
            return callback(err);
        }

        user.set('password_hash', hash);
        return callback(null, options);
    });

};

module.exports = Account;



