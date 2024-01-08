'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class books extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            books.hasMany(models.books_genres, {
                foreignKey: 'bookId',
                onDelete: 'CASCADE',
            });
        }
    }
    books.init(
        {
            name: DataTypes.STRING,
            deletedAt: DataTypes.DATE,
        },
        {
            sequelize,
            modelName: 'books',
        }
    );
    return books;
};
