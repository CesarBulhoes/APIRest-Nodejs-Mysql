const moment = require('moment')
const repository = require('../repositories/users')

class User {

    getList(){
        
        return repository.getList()
        .then((result) => {
            return result
        })
    }

    getById(id){

       return repository.getById(id)
        .then((result) => {
            return result[0]
        })
    }
    
    add(user){

        return repository.add(user)
        .then((result) => {
            let id = result.insertId
            user = {id, ...user}
            return user
        })
    }

    update(user) {

        const updated_at = moment().format('YYYY-MM-DD HH:MM')
        user.updated_at = updated_at

        return repository.update(user)
        .then((result) => {
            return user
        })
    }

    delete(user) {
        
        const updated_at = moment().format('YYYY-MM-DD HH:MM')
        user.updated_at = updated_at
        user.deleted = 1

        return repository.update(user)
        .then((result) => {
            return user
        })
    }
}

module.exports = new User()