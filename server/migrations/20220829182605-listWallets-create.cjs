'use strict';

let modelUser = { schema: 'public', tableName: 'Users' };
let modelListWallets = { schema: 'public', tableName: 'ListWallets' };

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable(modelListWallets, {
            id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
            UserId: {
                type: Sequelize.INTEGER,
                references: {
                    model: modelUser,
                    key: 'id',
                },
            },
            createdAt: { type: Sequelize.DATE, defaultValue: new Date() },
            updatedAt: { type: Sequelize.DATE, defaultValue: new Date() },
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable(modelListWallets);
    },
};
