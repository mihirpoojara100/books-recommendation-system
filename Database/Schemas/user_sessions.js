'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class user_sessions extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    user_sessions.init(
        {
            userId: {
                type: DataTypes.INTEGER,
                required: true,
                onDelete: 'CASCADE',
                references: {
                    model: 'users',
                    key: 'id',
                },
            },
            authToken: DataTypes.TEXT,
        },
        {
            sequelize,
            modelName: 'user_sessions',
        }
    );
    return user_sessions;
};
