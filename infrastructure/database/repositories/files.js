class Files {

    constructor(){ 

        this.schema = require('../schema').files
    }

    getList(){

        const options = {}

        return this.schema.findAndCountAll(options)
    }

    getListByUserId(userId){

        return this.schema.findAndCountAll({
            where: {
              userId: Number(userId)
            }
        })
    }

    getById(id){

        return this.schema.findAll({
            where: {
              id: Number(id)
            }
        })
    }

    getByUserAndFileIds(id, userId){

        return this.schema.findAll({
            where: {
              id: Number(id),
              userId: Number(userId)
            }
        })
    }

    add(file) {

        return this.schema.create(file)

    }  

    update(id, file){

        return this.schema.update(file, {
            where: {
              id: Number(id)
            }
        })
    }

    delete(id){

        return this.schema.destroy({
            where: {
              id: Number(id)
            }
        })
    }

    restore(id, file){
        
        return this.schema.update(file, {
            where: {
              id: Number(id)
            },
            paranoid: false 
        })
     }

     load(id){
        
        return this.schema.findAll({
            where: {
              id: Number(id)
            },
            paranoid: false
        })
     }
}

module.exports = new Files()