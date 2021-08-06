const userModel = require('../models/user')
const ErrorNotFound = require('../../errors/errorNotFound')
const UserSerializer = require('../serializer').UserSerializer

class userCtrl {

    getList = (req, res, next) => {
        
        const serializer = new UserSerializer(res.getHeader('Content-Type'), ['version'])

        const users = new userModel({})
        
        users.getList(req.query)
        .then(result => {
            
            if( result.rows[0] ){ 

                res.status(200).send(serializer.serialize(result))  

            } else throw new ErrorNotFound('Usuário')
        })
        .catch(error => next(error))
    }
    
    getById = (req, res, next) => {
        
        const serializer = new UserSerializer(res.getHeader('Content-Type'),
        ['password', 'createdAt', 'updatedAt', 'deletedAt', 'version'])
        
        const id = req.params.id

        const user = new userModel({id: id})
        
        user.getById()
        .then(result =>  {

            if( result[0] ) {
                
                const timestamp = new Date(result.updatedAt).getTime()
                res.set('Last-Modified', timestamp)
                res.set('ETag', result.version)
                res.status(200).send(serializer.serialize(result)) 

            }else throw new ErrorNotFound('Usuário')
        })
        .catch(error => next(error))
    }

    getHeadById = (req, res, next) => {
        
        const id = req.params.id

        const user = new userModel({id: id})
        
        user.load()
        .then(result =>  {

            if( result ) {
                
                const timestamp = new Date(result.updatedAt).getTime()
                res.set('Last-Modified', timestamp)
                res.set('ETag', result.version)
                res.status(200).end() 

            }else throw new ErrorNotFound('Usuário')
        })
        .catch(error => next(error))
    }
    
    add = (req, res, next) => {

        const serializer = new UserSerializer(res.getHeader('Content-Type'))
        
        const user = new userModel({name: req.body.name, email: req.body.email, password: req.body.password})
        
        user.add()
        .then(result => {

            const timestamp = new Date(result.updatedAt).getTime()
            res.set('Last-Modified', timestamp)
            res.set('ETag', result.version)
            res.set('Location', `/api/users/${result.id}`)
            res.status(201).send(serializer.serialize(result))
        })
        .catch(error => next(error))
    }
    
    update = async (req, res, next) => {

        const id = req.params.id
        let user = new userModel({id: id, name: req.body.name, email: req.body.email, password: req.body.password, minutes: req.body.minutes})
        
        user = await user.load()
        
        user.update()
        .then( async result => {
            
            if( result ){ 

                result = await user.load()
                
                const timestamp = new Date(result.updatedAt).getTime()
                res.set('Last-Modified', timestamp)
                res.set('ETag', result.version)
                res.set('Location', `/api/users/${result.id}`)
                res.status(204).end() 

            }else throw new ErrorNotFound('Usuário')
        
        })
        .catch(error => next(error))
    }
    
    delete = (req, res, next) => {

        const id = req.params.id

        const users = new userModel({id: id})
        
        users.delete()
        .then(result => {
            
            if( result )  res.status(204).end() 

            else throw new ErrorNotFound('Usuário')
        })
        .catch(error => next(error))
    }

    restore = (req, res, next) => {

        const id = req.params.id

        const users = new userModel({id: id})
        
        users.restore()
        .then(async result => {

            if( result ){ 
                
                result = await users.load()

                const timestamp = new Date(result.updatedAt).getTime()
                res.set('Last-Modified', timestamp)
                res.set('ETag', result.version)
                res.status(204).end() 

            } else throw new ErrorNotFound('Usuário')
        })
        .catch(error => next(error))
    }

    checkUserById = (req, res, next) => {

        const id = req.params.id

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