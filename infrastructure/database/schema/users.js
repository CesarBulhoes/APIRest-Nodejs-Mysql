const Sequelize = require('sequelize')
const connection = require('../connection')

class UsersSchema {
    
    constructor() {
        
        this.connection = connection
        this.schema = this.createTable()
        
    }

    async createTable(){
        
        const columns = {
            name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false
            },
            minutes: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false,
                defaultValue: 0
            }
            
                // ,references: {
                //     // This is a reference to another model
                //     model: Bar,
               
                //     // This is the column name of the referenced model
                //     key: 'id',
               
                //     // This declares when to check the foreign key constraint. PostgreSQL only.
                //     deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
                //   }
            
        }

        const options = {
            timestamps: true,
            paranoid: true,
            freezeTableName: true,
            tableName: 'users',
            version: "version"

        }
        
        return await connection.define('user', columns, options)
    }
}

module.exports = new UsersSchema().schema