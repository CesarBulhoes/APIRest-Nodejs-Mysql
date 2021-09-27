const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { ErrorNotFound } = require('../../errors')
const { UserSerializer } = require('../serializer')
const { UserServices} = require('../services')
const userServices = new UserServices()
const { AuthenticationServices } = require('./../services/')
const { generateHashPassword } = AuthenticationServices

class UserCtrl {

    login = async (req, res, next) => {

        const user = req.user
        const payload = {
            id: user.id
        }

        const token = jwt.sign(payload, process.env.AUTHORIZATION_SECRET,
            {
                expiresIn: '5m'
            })

        res.set('Authorization', token)

        res.status(204).end()
    }

    getList = (req, res, next) => {
        
        const serializer = new UserSerializer(res.getHeader('Content-Type'), ['version'])
        
        userServices.getAll(req.query)
        .then(result => {
            
            if( result ){ 

                res.status(200).send(serializer.serialize(result))  

            } else throw new ErrorNotFound('Users')
        })
        .catch(error => next(error))
    }
    
    getById = (req, res, next) => {
        
        const serializer = new UserSerializer(res.getHeader('Content-Type'),
        ['password', 'createdAt', 'updatedAt', 'deletedAt', 'version'])
        
        const id = req.params.id
        
        userServices.getById(id)
        .then(result =>  {
            
            if( result ) {

                const timestamp = new Date(result.updatedAt)
                res.set('Last-Modified', timestamp)
                res.set('ETag', result.version)
                res.status(200).send(serializer.serialize(result)) 

            }else throw new ErrorNotFound('Usuário')
        })
        .catch(error => next(error))
    }

    getHeadById = (req, res, next) => {
        
        const id = req.params.id
        
        userServices.load(id)
        .then(result =>  {

            if( result ) {

                const timestamp = new Date(result.updatedAt)
                res.set('Last-Modified', timestamp)
                res.set('ETag', result.version)
                res.status(200).end() 

            }else throw new ErrorNotFound('Usuário')
        })
        .catch(error => next(error))
    }
    
    add = async (req, res, next) => {

        const serializer = new UserSerializer(res.getHeader('Content-Type'))

        const user = req.body
        user.password = await generateHashPassword(user.password)
        console.log(user)
        userServices.add(user)
        .then(result => {

            const timestamp = new Date(result.updatedAt)
            res.set('Last-Modified', timestamp)
            res.set('ETag', result.version)
            res.set('Location', `/api/users/${result.id}`)
            res.status(201).send(serializer.serialize(result))
        })
        .catch(error => next(error))
    }
    
    update = (req, res, next) => {

        const id = req.params.id
        
        let user = req.body
        
        if(!user.password) delete user.password
        
        userServices.update(user, { id: Number(id) })
        .then( async result => {
            
            if( result ){ 
                
                result = await userServices.load(id)
                
                const timestamp = new Date(result.updatedAt)
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
        
        userServices.delete(id)
        .then(result => {
            
            if( result )  res.status(204).end() 

            else throw new ErrorNotFound('Usuário')
        })
        .catch(error => next(error))
    }

    restore = (req, res, next) => {

        const id = req.params.id

        userServices.restore(id)
        .then(async result => {

            if( result ){ 
                
                result = await userServices.load(id)

                const timestamp = new Date(result.updatedAt)
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
        
        userServices.getById(id)
        .then(result =>  {
            
            if( result ) return next()

            else throw new ErrorNotFound('Usuário')
        })
        .catch(error => next(error))
    }
    
}

module.exports = new UserCtrl()