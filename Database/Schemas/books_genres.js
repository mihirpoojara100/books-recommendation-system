'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class books_genres extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            books_genres.belongsTo(models.books, {
                foreignKey: 'bookId',
                onDelete: 'CASCADE',
            });
            books_genres.belongsTo(models.genres, {
                foreignKey: 'genreId',
                onDelete: 'CASCADE',
            });
        }
    }
    books_genres.init(
        {
            bookId: DataTypes.INTEGER,
            genreId: DataTypes.INTEGER,
            deletedAt: DataTypes.DATE,
        },
        {
            sequelize,
            modelName: 'books_genres',
        }
    );
    return books_genres;
};
