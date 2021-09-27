const Services = require('./Services')
const database = require('../models')

class UserServices extends Services{
    constructor(){
        super('Users')
        this.fileServices = new Services('Files')
    }

    async delete(id){
        
        return database.sequelize.transaction(async (t) => {
            
            await this.fileServices.update({ deletedAt: new Date() }, { userId: Number(id) }, { transaction: t })
            return await super.update({ deletedAt: new Date() }, { id: Number(id) }, { transaction: t })
        })
    }

    async getByEmail(email){
        
        const options = {
            where: {
                email: email
            }
    
        }
    
        let result = await database[this.modelName].findAll(options)
        return (result[0] ? result[0].get() : null)
    }
}

module.exports = UserServices