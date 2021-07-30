const fileFunc = require('../../infrastructure/functions/fileFunc')
const repository = require('../../infrastructure/repositories/files')

class File {

    constructor({id, userId, duration, path, createdAt, updatedAt, deletedAt, version}){
        this.id = id
        this.userId = userId
        this.duration = duration
        this.path = path
        this.createdAt = createdAt
        this.updatedAt = updatedAt
        this.deletedAt = deletedAt
        this.version = version
    }

    getList(){
        
        return repository.getList()
        .then((result) => {
            return result
        })
    }

    getListByUserId(){

        const userId = this.userId

        return repository.getListByUserId(userId)
        .then((result) => {
            return result
        })
    }

    getById(){

        const id = this.id

        return repository.getById(id)
        .then((result) => { 
            return result[0]
        })
    }

    getByUserAndFileIds(){

        const id = this.id
        const userId = this.userId

        return repository.getByUserAndFileIds(id, userId)
        .then((result) => {
            return result[0]
        })
    }
    
    add(){

        //Separar o upload e salvamento do arquivo em um método separado
        let buffer = false
        buffer = (buffer ? buffer : "d.png")
        
        const timestamp = new Date().getTime().toString()
        const filename = [`${timestamp.slice(timestamp.length - 5, timestamp.length)}`, 'png'].join('.')
        
        return fileFunc.uploadFile(buffer, filename)
        .then(path => {
            
            this.path = path
            this.duration = 150

            const file = {
                userId: this.userId,
                duration: this.duration,
                path: this.path
            }
            
            return  repository.add(file)
            .then((result) => {
                return result.get({plain:true})
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
        .then( result => { 
            return result
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
            
            this.userId = result[0].userId
            this.duration = result[0].duration
            this.path = result[0].path
            this.createdAt = result[0].createdAt
            this.updatedAt = result[0].updatedAt
            this.deletedAt = result[0].deletedAt
            this.version = result[0].version

            return this
        })
    }
}

module.exports = File