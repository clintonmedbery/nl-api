'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {
        return [
            queryInterface.addColumn(
                'Users',
                'exp',
                {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    defaultValue: 0
                }
            )
        ];
    },

    down: function (queryInterface, Sequelize) {
        return queryInterface.removeColumn('Users', 'exp');
    }
};