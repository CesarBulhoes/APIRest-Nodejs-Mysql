class Users {

    constructor(){ 

        this.schema = require('../database/schema/users')
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

     restore(id, user){
        
        return this.schema.update(user, {
            where: {
              id: id
            },
            paranoid: false 
        })
     }
}

module.exports = new Users()