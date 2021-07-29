const userModel = require('../models/user')
const ErrorNotFound = require('../../errors/errorNotFound')
const UserSerializer = require('../serializer').UserSerializer

class userCtrl {

    getList = (req, res, next) => {
        
        const serializer = new UserSerializer(res.getHeader('Content-Type'))

        const users = new userModel({})
        
        users.getList()
        .then(result => {
            
            if( result[0] ) res.status(200).send(serializer.serialize(result))  

            else throw new ErrorNotFound('Usuário')
        })
        .catch(error => next(error))
    }
    
    getById = (req, res, next) => {

        const serializer = new UserSerializer(res.getHeader('Content-Type'),
        ['password', 'createdAt', 'updatedAt', 'deletedAt', 'version'])
        
        const id = req.params.userId

        const users = new userModel({id: id})
        
        users.getById(id)
        .then(result =>  {
            
            if( result ) res.status(200).send(serializer.serialize(result)) 

            else throw new ErrorNotFound('Usuário')
        })
        .catch(error => next(error))
    }
    
    add = (req, res, next) => {

        const serializer = new UserSerializer(res.getHeader('Content-Type'))
        
        const users = new userModel({name: req.body.name, email: req.body.email, password: req.body.password})
        
        users.add()
        .then(result => res.status(201).send(serializer.serialize(result)))
        .catch(error => next(error))
    }
    
    update = (req, res, next) => {

        const id = req.params.userId
        const users = new userModel({id: id, name: req.body.name, email: req.body.email, password: req.body.password})
        
        users.update()
        .then(result => {
            
            if( result[0] ) res.status(204).end() 

            else throw new ErrorNotFound('Usuário')
        
        })
        .catch(error => next(error))
    }
    
    delete = (req, res, next) => {

        const id = req.params.userId

        const users = new userModel({id: id})
        
        users.delete()
        .then(result => {
            
            if( result )  res.status(204).end() 

            else throw new ErrorNotFound('Usuário')
        })
        .catch(error => next(error))
    }

    restore = (req, res, next) => {

        const id = req.params.userId

        const users = new userModel({id: id})
        
        users.restore()
        .then(result => {

            if( result[0] ) res.status(204).end() 

            else throw new ErrorNotFound('Usuário')
        })
        .catch(error => next(error))
    }

    checkUserById = (req, res, next) => {

        const id = req.params.userId

        if(!id) return next()

        const users = new userModel({id: id})
        
        users.getById()
        .then(result =>  {
            
            if( result ) return next()

            else throw new ErrorNotFound('Usuário')
        })
        .catch(error => next(error))
    }
    
}

module.exports = new userCtrl()