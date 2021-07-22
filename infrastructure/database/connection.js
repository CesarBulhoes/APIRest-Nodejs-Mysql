// const mysql = require('mysql')
const config = require('config')
const Sequelize = require('sequelize')

const connection = new Sequelize(
    config.get("mysql.database"), 
    config.get("mysql.user"), 
    config.get("mysql.password"),
    {
        host: config.get("mysql.host"),
        dialect: "mysql",
    //    logging: false
    })
    
// mysql.createConnection(
//     config.get("mysql"),
// )

module.exports = connection