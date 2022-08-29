'use strict';

let modelUser = { schema: 'public', tableName: 'Users' };

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable(modelUser, {
            id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
            login: { allowNull: false, type: Sequelize.STRING },
            password: { type: Sequelize.STRING },
            role: { type: Sequelize.STRING, defaultValue: 'user' },
            createdAt: { type: Sequelize.DATE, defaultValue: new Date() },
            updatedAt: { type: Sequelize.DATE, defaultValue: new Date() },
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable(modelUser);
    },
};
