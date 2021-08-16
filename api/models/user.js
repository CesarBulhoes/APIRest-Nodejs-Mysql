'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Files, {
        foreignKey: 'userId',
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
        isAlpha: {
          msg: "'Name' must contain only letters."
        }, 
        len: {
          args: [3, 50],
          msg: "'Name' must have a length between 3 and 50 characteres."
        }
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
          msg: "'Email' is invalid."
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        password: function(password) {
          if(!(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,50}$/.test(password))) {
              throw new Error("'Password' must contain at least 8 and maximum 50 characters including at least 1 uppercase, 1 lowercase, one number and one special character (@, $, !, %, *, ?, &).");
          }
        }
      }
    },
    minutes: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
      validate: {
        isNumeric: {
          msg: "'Minutes' must be a number."
        },
        min: {
          args: [0],
          msg: "'Minutes' must be nonnegative."
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

