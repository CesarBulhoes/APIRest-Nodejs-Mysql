const repository = require('../../infrastructure/repositories/users')

class User {

    constructor({id, name, email, password, minutes, createdAt, updatedAt, deletedAt, version}){
        this.id = id
        this.name = name
        this.email = email
        this.password = password
        this.minutes = minutes
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

    getById(){

       return repository.getById(this.id)
        .then((result) => {
            return result[0]
        })
    }
    
    add(){

        const user = {
            name: this.name, 
            email: this.email, 
            password: this.password
        }

        return repository.add(user)
        .then((result) => {
            return result.get({plain:true})
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
        .then((result) => {
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
        
        return repository.restore(id)
        .then((result) => {
            return result
        })
    }

    load() {

        const id = this.id
        
        return repository.load(id)
        .then((result) => {
            
            this.name = result[0].name
            this.email = result[0].email
            this.password = result[0].password
            this.minutes = result[0].minutes
            this.createdAt = result[0].createdAt
            this.updatedAt = result[0].updatedAt
            this.deletedAt = result[0].deletedAt
            this.version = result[0].version

            return this
        })
    }
}

module.exports = User