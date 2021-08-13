'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class File extends Model {
    
    static associate(models) {
      File.belongsTo(models.Users, {
        foreignKey: 'userId'
      });
    }
  };
  File.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'users',
        key: 'id'
      }
    },
    duration: {
      type: DataTypes.INTEGER.UNSIGNED,
      defaultValue: null,
      validate: {
        Duration: (duration) => {
          if(!duration || !Number.isInteger(duration)) throw new Error('Duração inválida, necessário ser um valor inteiro maior que 0 segundos')
        }
      }
    },
    path: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'O caminho para o arquivo não pode ser vazio'
        }
      }
    }
  }, {
    sequelize,
    timestamps: true,
    paranoid: true,
    freezeTableName: true,
    version: "version",
    modelName: 'Files',
  });
  return File;
};