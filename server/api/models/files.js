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
        Duration: (duration) => { //It can be null, if not null it must be a nonnegative number
          if( !duration || (!Number.isInteger(Number(duration))) && Number(duration) > 0 ) throw new Error("'Duration' must be a nonnegative number.")
        }
      }
    },
    // size: {
    //   type: DataTypes.INTEGER.UNSIGNED,
    //   defaultValue: 0,
    //   allowNull: false,
    //   validate: {
    //     min: {
    //       args: 0,
    //       msg: "'Size' must be a nonnegative number."
    //     }
    //   }
    // },
    path: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "'Path' must not be empty."
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