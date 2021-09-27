'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class BlackList extends Model {
        static associate(models) {
            //   User.hasMany(models.Files, {
            //     foreignKey: 'userId',
            //     // scope: { paranoid: false }, //scope is optional
            //     as: 'Files'
            //   })
        }
    };
    BlackList.init({
        token: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            isAlphanumeric: {
              msg: "'Token' must contain only numbers and letters."
            }
          }
        }
    }, {
    //     hooks: {
    //         afterCreate: function (user, options) {
    //             models.Config.create({
    //                 UserId: user.id
    //             })
    //         }
    //     }, 
        sequelize,
        timestamps: true,
        freezeTableName: true,
        version: 'version',
        modelName: 'BlackList'
    });

    sequelize.query(`CREATE EVENT IF NOT EXISTS delete_from_blacklist
                        ON SCHEDULE
                        EVERY 1 DAY
                        STARTS   CONCAT(CURDATE() + INTERVAL 1 DAY, ' 03:00:00') ON COMPLETION PRESERVE ENABLE 
                        DO
                            DELETE FROM users WHERE createdAt < DATE_SUB(NOW(), INTERVAL 1 DAY);`)

    return BlackList;
};



/*  
    DROP EVENT IF EXISTS delete_from_blacklist;
*/