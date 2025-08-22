'use strict';

const { Model } = require('sequelize');
const { hashSync } = require('bcrypt');
const { GENDERS } = require('./../../constants');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Task, {
        foreignKey: {
          name: 'userId',
          allowNull: false,
        },
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
      });
    }
  }
  User.init(
    {
      firstName: {
        type: DataTypes.STRING(64),
        allowNull: false,
        field: 'first_name',
        validate: {
          is: /^[A-Z][a-z]+$/,
          len: [2, 64],
        },
      },
      lastName: {
        type: DataTypes.STRING(64),
        field: 'last_name',
        validate: {
          is: /^[A-Z][a-z]+$/,
          len: [2, 64],
        },
      },
      email: {
        type: DataTypes.STRING(100),
        unique: true,
        allowNull: false,
        validate: { isEmail: true },
      },
      passwordHush: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'password_hush',
        set(value) {
          this.setDataValue(
            'passwordHush', // ім’я поля моделі
            hashSync(value, Number(process.env.HASH_SALT))
          );
        },
      },
      birthday: {
        type: DataTypes.DATEONLY,
        validate: {
          isBefore: new Date().toISOString(),
        },
      },
      gender: {
        type: DataTypes.STRING(10),
        validate: {
          isIn: [GENDERS],
        },
      },
      image: DataTypes.STRING(255),
    },
    {
      sequelize,
      modelName: 'User',
      underscored: true,
    }
  );
  return User;
};
// underscored:true :
// {firstName: 'Test'} => first_name
//                          Test
