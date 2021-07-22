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
            return result.dataValues
        })
    }

    update(id, user) {

        return repository.update(id, user)
        .then((result) => {
            return result
        })
    }

    delete(id, user) {

        return repository.delete(id, user)
        .then((result) => {
            return result
        })
    }
}

module.exports = new User()