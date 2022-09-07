'use strict';

let modelWallets = { schema: 'public', tableName: 'Wallets' };
let modelRevenues = { schema: 'public', tableName: 'Revenues' };

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable(modelRevenues, {
            id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
            name: { type: Sequelize.STRING, allowNull: false },
            value: { type: Sequelize.INTEGER },
            WalletId : {
              type: Sequelize.INTEGER,
              onDelete: 'CASCADE',
              references: {
                model: modelWallets,
                key: 'id',
                as: 'revenue'
              } 
            },
            createdAt: { type: Sequelize.DATE, defaultValue: new Date() },
            updatedAt: { type: Sequelize.DATE, defaultValue: new Date() }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable(modelRevenues);
    },
};
