'use strict';
const sequelize = require("sequelize");
const User = require("./User");
const {db} = require("../services/db");

module.exports = (sequelize, DataTypes) => {
    var Savings = sequelize.define('Savings', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING
        },
        amount: {
            type: DataTypes.FLOAT,
        },
        userId: {
            type: DataTypes.INTEGER,
            foreignKey: true
        },
        deletedAt: {
            type: DataTypes.DATE
        },
    }, {
        timestamps: true,
        freezeTableName: true,
        //Sets timestamp instead of deleting
        paranoid: true,
        version: true,
        classMethods: {
            associate: function(models) {
                // associations can be defined here
                Savings.belongsTo(models.User, { foreignKey: 'userId' });
            }
        }
    });


    // User.beforeCreate((user, options) => {
    //
    //     user.createdAt = new Date();
    //     return bcrypt.hash(user.password, config.secret)
    //         .then(hash => {
    //             user.password = hash;
    //         })
    //         .catch(err => {
    //             throw new Error();
    //         });
    // });

    return Savings;
};
