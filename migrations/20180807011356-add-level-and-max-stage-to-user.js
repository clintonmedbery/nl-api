'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {
        return [
            queryInterface.addColumn(
                'Users',
                'level',
                {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    defaultValue: 1
                }
            ),
            queryInterface.addColumn(
                'Users',
                'maxStage',
                {
                    type: Sequelize.STRING,
                    allowNull: false,
                    defaultValue: 1

                }
            )
        ];
    },

    down: function (queryInterface, Sequelize) {
        return queryInterface.removeColumn('Users', 'level').then(function () {
            return queryInterface.removeColumn('Users', 'maxStage');
        });
    }
};