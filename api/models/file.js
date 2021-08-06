const fileFunc = require('../../infrastructure/functions/fileFunc')
const repository = require('../../infrastructure/database/repositories/files')

class File {

    constructor({ id, userId, duration, path, createdAt, updatedAt, deletedAt, version }) {
        this.id         = id
        this.userId     = userId
        this.duration   = duration
        this.path       = path
        this.createdAt  = createdAt
        this.updatedAt  = updatedAt
        this.deletedAt  = deletedAt
        this.version    = version
    }

    getList() {

        return repository.getList()
            .then((result) => {

                result.rows = result.rows.map(el => el.get())
                return result
            })
    }

    getListByUserId() {

        const userId = this.userId

        return repository.getListByUserId(userId)
            .then((result) => {
                result.rows = result.rows.map(el => el.get())
                return result
            })
    }

    getById() {

        const id = this.id

        return repository.getById(id)
            .then((result) => {
                return result.map(el => el.get())
            })
    }

    getByUserAndFileIds() {

        const id = this.id
        const userId = this.userId

        return repository.getByUserAndFileIds(id, userId)
            .then((result) => {
                return result.map(el => el.get())
            })
    }

    add() {

        //Separar o upload e salvamento do arquivo em um método separado
        let buffer = false
        buffer = (buffer ? buffer : "d.png")

        const timestamp = new Date().getTime().toString()
        const filename = [`${timestamp.slice(timestamp.length - 5, timestamp.length)}`, 'png'].join('.')

        return fileFunc.uploadFile(buffer, filename)
            .then(path => {

                this.path = path

                const file = {
                    userId: this.userId,
                    duration: this.duration,
                    path: this.path
                }

                return repository.add(file)
                    .then((result) => {
                        return result.get()
                    })
            })
    }

    update() {

        const id = this.id
        const file = {
            duration: this.duration,
            path: this.path
        }

        return repository.update(id, file)
            .then(result => {
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
        const file = { deletedAt: null }

        return repository.restore(id, file)
            .then((result) => {
                return result
            })
    }

    load() {

        const id = this.id

        return repository.load(id)
            .then((result) => {

                if (this.userId === undefined)      this.userId = result[0].userId
                if (this.duration === undefined)    this.duration = result[0].duration
                if (this.path === undefined)        this.path = result[0].path
                if (this.createdAt === undefined)   this.createdAt = result[0].createdAt
                if (this.updatedAt === undefined)   this.updatedAt = result[0].updatedAt
                if (this.deletedAt === undefined)   this.deletedAt = result[0].deletedAt
                if (this.version === undefined)     this.version = result[0].version

                return this
            })
    }
}

module.exports = File