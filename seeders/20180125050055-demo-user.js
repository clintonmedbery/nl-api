'use strict';

const bcrypt = require("bcrypt");

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Users', [{
            firstName: 'Clint',
            lastName: 'Medbery',
            email: 'clintomed+1@gmail.com',
            password: "$2a$08$Ue5MmtpRbWLL65o7/b/My.OCr0JpQrfXldXeYfuNncc0tRDPb3px6",
            createdAt: new Date(),
            updatedAt: new Date()
        }], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Users', {
            email: 'clintomed+1@gmail.com'
        }, {});
    }
};
