'use strict';
const { Model } = require('sequelize');
const { SALT_ROUNDS } = require('../../Configs/constants');
const bcrypt = require('bcrypt');
module.exports = (sequelize, DataTypes) => {
    class users extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    users.init(
        {
            name: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            deletedAt: DataTypes.DATE,
        },
        {
            sequelize,
            modelName: 'users',
            hooks: {
                beforeCreate: async (user) => {
                    // Hash the password before storing it in the database
                    const hashedPassword = await bcrypt.hash(
                        user.password,
                        SALT_ROUNDS
                    );

                    user.password = hashedPassword;
                },
            },
        }
    );
    return users;
};
