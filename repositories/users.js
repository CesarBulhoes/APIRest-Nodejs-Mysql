const query = require('../infrastructure/database/queries')

class Users {

    getList(){

        const sql = `SELECT * FROM users WHERE deleted = 0`

        return query(sql)
    }

    getById(id){

        const sql = `SELECT * FROM users WHERE id = ?`

        return query(sql, id)
    }

    add(user) {

        const sql = `INSERT INTO users SET ?`
        return query(sql, user)
    }  

    update(user){

        const sql = `UPDATE users SET ? WHERE id = ?`
        const userId = user.id
       
        return query(sql, user, userId)
    }
}

module.exports = new Users()