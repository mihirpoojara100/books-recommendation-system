'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('books_genres', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            bookId: {
                type: Sequelize.INTEGER,
                required: true,
                onDelete: 'CASCADE',
                references: {
                    model: 'books',
                    key: 'id',
                },
            },
            genreId: {
                type: Sequelize.INTEGER,
                required: true,
                onDelete: 'CASCADE',
                references: {
                    model: 'genres',
                    key: 'id',
                },
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            deletedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('books_genres');
    },
};
