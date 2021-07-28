const userModel = require('../models/user')
const ErrorNotFound = require('../../errors/errorNotFound')
const UserSerializer = require('../serializer').UserSerializer

class userCtrl {

    getList = (req, res, next) => {
        
        const serializer = new UserSerializer(res.getHeader('Content-Type'))
        
        userModel.getList()
        .then(result => {
            
            if( result[0] ) res.status(200).send(serializer.serialize(result))  

            else throw new ErrorNotFound('Usuário')
        })
        .catch(error => next(error))
    }
    
    getById = (req, res, next) => {

        const serializer = new UserSerializer(res.getHeader('Content-Type'),
        ['password', 'createdAt', 'updatedAt', 'deletedAt', 'version'])
        
        const id = req.params.id

        userModel.getById(id)
        .then(result =>  {
            
            if( result ) res.status(200).send(serializer.serialize(result)) 

            else throw new ErrorNotFound('Usuário')
        })
        .catch(error => next(error))
    }
    
    add = (req, res, next) => {

        const serializer = new UserSerializer(res.getHeader('Content-Type'))
        
        const user = req.body

        userModel.add(user)
        .then(result => res.status(201).send(serializer.serialize(result)))
        .catch(error => next(error))
    }
    
    update = (req, res, next) => {

        const id = req.params.id
        const user = req.body
        
        userModel.update(id, user)
        .then(result => {
            
            if( result[0] ) res.status(204).end() 

            else throw new ErrorNotFound('Usuário')
        
        })
        .catch(error => next(error))
    }
    
    delete = (req, res, next) => {

        const id = req.params.id
        const user = req.body

        userModel.delete(id)
        .then(result => {

            if( result ) res.status(204).end() 

            else throw new ErrorNotFound('Usuário')
        })
        .catch(error => next(error))
    }
}

module.exports = new userCtrl()