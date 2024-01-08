'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('genres', [
            { name: 'Fiction', createdAt: new Date(), updatedAt: new Date() },
            {
                name: 'Non-Fiction',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            { name: 'Mystery', createdAt: new Date(), updatedAt: new Date() },
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('genres', null, {});
    },
};
