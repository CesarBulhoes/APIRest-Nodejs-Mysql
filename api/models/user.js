const repository = require('../../infrastructure/database/repositories/users')

class User {

    constructor({ id, name, email, password, minutes, createdAt, updatedAt, deletedAt, version }) {
        this.id         = id
        this.name       = name
        this.email      = email
        this.password   = password
        this.minutes    = minutes
        this.createdAt  = createdAt
        this.updatedAt  = updatedAt
        this.deletedAt  = deletedAt
        this.version    = version
    }

    getList(data) {

        return repository.getList(data)
            .then((result) => {
                
                result.rows = result.rows.map(el => el.get())
                return result
            })
    }

    getById() {

        return repository.getById(this.id)
            .then(async (result) => {
                return await result.map(el => el.get())
            })
    }

    add() {

        const user = {
            name: this.name,
            email: this.email,
            password: this.password
        }

        return repository.add(user)
            .then((result) => { 
                return result.get()
            })
    }

    update() {

        const id = this.id
        const user = {
            name: this.name,
            email: this.email,
            password: this.password
        }

        return repository.update(id, user)
            .then((result) => { console.log(result)
                return result[0]
            })
    }

    delete() {

        const id = this.id

        return repository.delete(id)
            .then((result) => {
                return result
            })
    }

    restore() {

        const id = this.id

        return repository.restore(id)
            .then((result) => {
                return result
            })
    }

    load() {

        const id = this.id

        return repository.load(id)
            .then((result) => {

                if (this.name === undefined)        this.name = result[0].dataValues.name
                if (this.email === undefined)       this.email = result[0].dataValues.email
                if (this.password === undefined)    this.password = result[0].dataValues.password
                if (this.minutes === undefined)     this.minutes = result[0].dataValues.minutes
                if (this.createdAt === undefined)   this.createdAt = result[0].dataValues.createdAt
                if (this.updatedAt === undefined)   this.updatedAt = result[0].dataValues.updatedAt
                if (this.deletedAt === undefined)   this.deletedAt = result[0].dataValues.deletedAt
                if (this.version === undefined)     this.version = result[0].dataValues.version
                return this
            })
    }
}

module.exports = User