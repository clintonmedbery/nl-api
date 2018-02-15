const Sequelize = require('sequelize');
const config = require("../../config/config.json");

const sequelize = new Sequelize('postgres://dbadmin:test_password@localhost:15432/nuleaf', config);
sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });
var db = {
    Sequelize,
    sequelize: sequelize
};
db.User = db.sequelize.import("../models/user");

module.exports = db;