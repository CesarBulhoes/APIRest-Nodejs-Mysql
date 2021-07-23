const schema = require('../database/schema/users')

class Users {

    constructor(){ 

        schema.then(obj => this.schema = obj)
    }

    getList(){
        
        return this.schema.findAll({ raw: true })

    }

    getById(id){

        return this.schema.findAll({
            where: {
              id: id
            },
            raw: true 
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

    delete(id){
        
        return this.schema.destroy({
            where: {
              id: id
            }
        })
     }
}

module.exports = new Users()