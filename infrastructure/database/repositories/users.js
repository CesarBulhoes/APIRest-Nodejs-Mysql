const Sequelize = require('sequelize')
const Op = Sequelize.Op 
const { sequelize } = require('../schema')

class Users {

    constructor() {
        
        this.schema = require('../schema').users
    }

    async getList(data) {
        
        const {id, data_inicial, data_final} = data
        const where = {}
        id || data_inicial || data_final ? where.id = {} : null
        id ? where.id[Op.gte] = id : null
        const options = {
            where: where, 
            limit: 2, 
            order: [['id', 'DESC']]
        }
        // data_inicial ? where.dataColumnFromTable[Op.gte] = data_inicial : null
        // data_final ? where.dataColumnFromTable[Op.lte] = data_final : null
        
        return this.schema.findAndCountAll(options)
    }

    getById(id) {

        return this.schema.findAll({
            where: {
                id: Number(id)
            }
            
        })//.getTest()

    }

    add(user) {

        return this.schema.create(user)

    }

    update(id, user) {

        return this.schema.update(user, {
            where: {
                id: Number(id)
            }
        })
    }

    delete(id) {

        return this.schema.destroy({
            where: {
                id: Number(id)
            }
        })
    }

    restore(id) {
        console.log("CHEGOU AQUI")

        return this.schema.restore({
            where: {
                id: Number(id)
            },
            paranoide: false
        })
    }

    load(id) {
        return this.schema.findAll({
            where: {
                id: Number(id)
            },
            paranoid: false
        })
    }
}

module.exports = new Users()