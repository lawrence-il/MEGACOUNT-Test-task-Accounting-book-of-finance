'use strict';

let modelWallets = { schema: 'public', tableName: 'Wallets' };
let modelListWallets = { schema: 'public', tableName: 'ListWallets' };
let modelListWalletsWallets = { schema: 'public', tableName: 'ListWalletsWallets' };

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable(modelListWalletsWallets, {
            id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
            ListWalletId: {
              type: Sequelize.INTEGER,
              references: {
                model: modelListWallets,
                key: 'id',
              }
            },
            WalletId: {
              type: Sequelize.INTEGER,
              references: {
                model: modelWallets,
                key: 'id',
              } 
            },
            createdAt: { type: Sequelize.DATE, defaultValue: new Date() },
            updatedAt: { type: Sequelize.DATE, defaultValue: new Date() }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable(modelListWalletsWallets);
    },
};
