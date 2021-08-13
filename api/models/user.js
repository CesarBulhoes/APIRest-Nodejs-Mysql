'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Files, {
        foreignKey: 'userId',
        // {
        //   name: 'userId',
        //   allowNull: false
        // },
        // scope: { paranoid: false }, //scope is optional
        as: 'Files'
      })
    }
  };
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [3, 50],
          msg: "'Nome' precisa ter pelo menos 3 caracteres."
        }
        // custom: (data) => {
        //   if(data.length < 3) throw new Error('tá errado')
        // }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail:// true
        {
          args: true,
          msg: "'Email' inválido"
        },
        len: {
          args: [3, 50],
          msg: "'Email' precisa ter pelo menos 3 caracteres"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [6, 50],
          msg: "'Senha' precisa ter pelo menos 6 caracteres"
        }
      }
    },
    minutes: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
      validate: {
        custom: (minutes) => {
          if (minutes < 0) throw Error("'Minutes' precisa ser maior ou igual a 0")
        }
      }
    }
  }, {
    sequelize,
    timestamps: true,
    paranoid: true,
    freezeTableName: true,
    version: 'version',
    modelName: 'Users',
    defaultScope: { // Sets a global condiciotal to all querys
      where: {
        //     name: 'Test1'
      }
    },
    scopes: { // scopes override defaultScopes in the squelize functions 'this.schema.scope('scopeTest').findAll({ raw: true })'
      //scopeTest: { value } 
    }
  });
  return User;
};

