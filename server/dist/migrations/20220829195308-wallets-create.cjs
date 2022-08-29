'use strict';

let modelWallets = { schema: 'public', tableName: 'Wallets' };

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable(modelWallets, {
            id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
            name: { type: Sequelize.STRING, allowNull: false },
            value: { type: Sequelize.INTEGER },
            createdAt: { type: Sequelize.DATE, defaultValue: new Date() },
            updatedAt: { type: Sequelize.DATE, defaultValue: new Date() }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable(modelWallets);
    },
};
