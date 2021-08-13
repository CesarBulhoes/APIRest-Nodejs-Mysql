const Sequelize = require('sequelize')
const Op = Sequelize.Op
const database = require('../models')

class Services {
    constructor(modelName) {
        this.modelName = modelName
    }

    async getAll({ id, userId = '', initial_date = '', final_date = '', page = 1, limit = 10 } = {}) {

        const where = {}
        id ? where.id = Number(id) : null
        userId ? where.userId = Number(userId) : null
        initial_date ? where.createdAt[Op.gte] = initial_date : null
        final_date ? where.createdAt[Op.lte] = final_date : null

        const options = {
            where: where,
            limit: Number(limit),
            offset: (page-1)*5,
            order: [['id', 'DESC']]
        }

        // const value = 0;
        // options = {
        //     where: {
        //         id: {
        //             [Op.gte]: 5
        //         }
        //     },
        //     attributes: ['password'], //select specific columns
        //     group: ['password'], // groupBy
        //     having: Sequelize.literal(`count(password) >= ${value}`) //literal condition
        // }
        
        let result = await database[this.modelName].findAndCountAll(options)
        result.rows = result.rows.map(el => el.get())
        return (result.rows[0] ? result : null)
    }

    async getById(id) {

        const options = {
            where: {
                id: id
            }

        }

        let result = await database[this.modelName].findAll(options)
        return (result[0] ? result[0].get() : null)
    }

    async add(data) {

        let result = await database[this.modelName].create(data)
        return (result ? result.get() : null)
    }

    async update(data, id, transaction = {}) {

        const options = {
            where: {
                id: Number(id)
            }
        }

        let result = await database[this.modelName].update(data, options, transaction)

        return result[0]
    }

    async delete(id) {
        
        const options = {
            where: {
                id: Number(id),
                deletedAt: null
            }
        }

        let result = await database[this.modelName].update({ deletedAt: new Date() }, options)
        return result[0] 
    }

    async restore(id) {

        const options = {
            where: {
                id: Number(id)
            },
            paranoide: false
        }

        return database[this.modelName].restore(options)
    }

    async load(id){
        
        let result = await database[this.modelName].findByPk(id)
        result.rows = result.rows.map(el => el.get())
        return (result.rows[0] ? result : null)
    }

    async load(id) {
        
        let options = {
            where: {
                id: Number(id)
            },
            paranoid: false
        }

        let result = await database[this.modelName].findAll(options)
        return (result[0] ? result[0].get() : null)
    }
}

module.exports = Services