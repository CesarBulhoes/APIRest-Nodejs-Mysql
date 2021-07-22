const schema = require('../infrastructure/database/schema/users')

class Users {

    constructor(){ 

        schema.then(obj => this.schema = obj)
    }

    getList(){
        
        return this.schema.findAll()

    }

    getById(id){

        return this.schema.findAll({
            where: {
              id: id
            }
        })
    }

    add(user) {

        return this.schema.create(user)

    }  

    update(id, user){
        
        return this.schema.update(user, {
            where: {
              id: id
            }
        })
    }

    delete(id, user){
        
        return this.schema.destroy({
            where: {
              id: id
            }
        })
     }
}

module.exports = new Users()