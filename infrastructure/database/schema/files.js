const Sequelize = require('sequelize')
const connection = require('../connection')

const columns = {
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    // extension: {
    //     type: Sequelize.ENUM("mp4"),
    //     allowNull: false
    // },
    duration: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0
    },
    path: {
        type: Sequelize.STRING,
        allowNull: false,
    }
}

const options = {
    timestamps: true,
    paranoid: true,
    freezeTableName: true,
    tableName: 'files',
    version: "version"

}

module.exports = connection.define('files', columns, options)