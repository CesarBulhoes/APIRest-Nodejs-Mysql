const moment = require('moment')
const connection = require('../infrastructure/connection')

class User {

    getList(res){
        const sql = `SELECT * FROM users WHERE deleted = 0`
        
        connection.query(sql, (error, result) => {
            if (error) return res.status(400).send(error)
            else  return res.status(200).send(result)
        })
    }

    getById(id, res){
        const sql = `SELECT * FROM users WHERE id = ?`
        
        connection.query(sql, [id], (error, result) => {
            if (error) return res.status(400).send(error)
            else  return res.status(200).send(result[0])
        })
    }
    
    addUser(user, res){

        const sql = `INSERT INTO users SET ?`
        connection.query(sql, user, (error, result) => {
            console.log(result)
            if (error) res.status(400).send(error)
            else {
                let id = result.insertId
                user = {id, ...user}
                res.status(201).send(user)
            }
        })
    }

    updateUser(user, res) {

        const updated_at = moment().format('YYYY-MM-DD HH:MM')
        user = {...user, updated_at}

        const sql = `UPDATE users SET ? WHERE id = ?`
        connection.query(sql, [user, user.id], (error, result) => {
            if (error) res.status(400).send(error)
            else  res.status(200).send(user)
        })
    }

    deleteUser(user, res) {
        
        const updated_at = moment().format('YYYY-MM-DD HH:MM')
        const deleted = 1
        user = {...user, updated_at, deleted}

        const sql = `UPDATE users SET ? WHERE id = ?`
        connection.query(sql, [user, user.id], (error, result) => {
            if (error) res.status(400).send(error)
            else  res.status(200).send(user)
        })
    }

}

module.exports = new User()