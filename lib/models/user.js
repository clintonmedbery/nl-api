'use strict';
const bcrypt = require("bcrypt");
const sequelize = require("sequelize");
import config from '../config';

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('Users', {
      id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true
      },
      firstName: {
          type: DataTypes.STRING
      },
      lastName: {
          type: DataTypes.STRING
      },
      email: {
          type: DataTypes.STRING,
          validate: {
              isEmail: true
          }
      },
      password: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
              len: [6,100]
          }
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
        }
    }
  });

  User.beforeCreate((user, options) => {
      user.email = user.email.toLowerCase();
      user.createdAt = new Date();
      return bcrypt.hash(user.password, config.secret)
          .then(hash => {
              user.password = hash;
          })
          .catch(err => {
              throw new Error();
          });
  });

  return User;
};
