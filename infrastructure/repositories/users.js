const sequelize = require('../database/connection')

class Users {

    constructor() {

        this.schema = require('../database/schema/users')
    }

    getList() {

        return this.schema.findAll({ raw: true })

    }

    getById(id) {

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

    update(id, user) {

        return this.schema.update(user, {
            where: {
                id: id
            }
        })
    }

    delete(id) {

        return this.schema.destroy({
            where: {
                id: id
            }
        })
    }

    async restore(id) {

        const user = await this.schema.findOne({
            where: {
                id: id
            },
            paranoid: false
        })

        user.setDataValue('deletedAt', null);
        user.save()
        return user
    }

    load(id){
        return this.schema.findAll({
            where: {
                id: id
            },
            raw: true,
            paranoid: false
        })
    }
}

module.exports = new Users()