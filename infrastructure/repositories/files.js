class Files {

    constructor(){ 

        this.schema = require('../database/schema/files')
    }

    getList(){

        return this.schema.findAll({ raw: true })
    }

    getListByUserId(userId){

        return this.schema.findAll({
            where: {
              userId: userId
            },
            raw: true 
        })
    }

    getById(id){

        return this.schema.findAll({
            where: {
              id: id
            },
            raw: true 
        })
    }

    getByUserAndFileIds(id, userId){

        return this.schema.findAll({
            where: {
              id: id,
              userId: userId
            },
            raw: true 
        })
    }

    add(file) {

        return this.schema.create(file)

    }  

    update(id, file){

        return this.schema.update(file, {
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

    restore(id, file){
        
        return this.schema.update(file, {
            where: {
              id: id
            },
            paranoid: false 
        })
     }

     load(id){
        
        return this.schema.findAll({
            where: {
              id: id
            },
            raw: true ,
            paranoid: false
        })
     }
}

module.exports = new Files()