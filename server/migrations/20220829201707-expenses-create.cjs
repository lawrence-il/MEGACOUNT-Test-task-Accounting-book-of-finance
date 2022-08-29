'use strict';

let modelWallets = { schema: 'public', tableName: 'Wallets' };
let modelExpenses = { schema: 'public', tableName: 'Expenses' };

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable(modelExpenses, {
            id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
            name: { type: Sequelize.STRING, allowNull: false },
            value: { type: Sequelize.INTEGER },
            WalletId : {
              type: Sequelize.INTEGER,
              references: {
                model: modelWallets,
                key: 'id',
                as: 'expense'
              } 
            },
            createdAt: { type: Sequelize.DATE, defaultValue: new Date() },
            updatedAt: { type: Sequelize.DATE, defaultValue: new Date() }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable(modelExpenses);
    },
};
