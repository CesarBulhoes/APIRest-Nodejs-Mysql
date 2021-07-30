const fileModel = require('../models/file') 
const ErrorNotFound = require('../../errors/errorNotFound')
const FileSerializer = require('../serializer').FileSerializer

class fileCtrl {

    getList = (req, res, next) => {

        if(req.params.userId) return next()

        const serializer = new FileSerializer(res.getHeader('Content-Type'))

        const file = new fileModel({})

        file.getList()
        .then(result => res.status(200).send(serializer.serialize(result)))
        .catch(error => next(error))
    } 

    getListByUserId = (req, res, next) => {

        const userId = req.params.userId
        const serializer = new FileSerializer(res.getHeader('Content-Type'))

        const file = new fileModel({userId: userId})

        file.getListByUserId()
        .then(result => res.status(200).send(serializer.serialize(result)))
        .catch(error => next(error))
    } 
    
    getById = (req, res, next) => {

        const id = req.params.id

        if(req.params.userId) return next()
        
        const serializer = new FileSerializer(res.getHeader('Content-Type'))
        
        const file = new fileModel({id: id})

        file.getById()
        .then(result => {

            if( result ) {
                
                const timestamp = new Date(result.updatedAt).getTime()
                res.set('Last-Modified', timestamp)
                res.set('ETag', result.version)
                res.status(200).send(serializer.serialize(result))

            } else throw new ErrorNotFound('Arquivo')
        })
        .catch(error => next(error))
    } 

    getHeadById = (req, res, next) => {

        const id = req.params.id

        if(req.params.userId) return next()
        
        const file = new fileModel({id: id})

        file.load()
        .then(result => {

            if( result ) {
                
                const timestamp = new Date(result.updatedAt).getTime()
                res.set('Last-Modified', timestamp)
                res.set('ETag', result.version)
                res.status(200).end()

            } else throw new ErrorNotFound('Arquivo')
        })
        .catch(error => next(error))
    } 

    getByUserAndFileIds = (req, res, next) => {

        const id = req.params.id
        const userId =  req.params.userId
        const serializer = new FileSerializer(res.getHeader('Content-Type'))
        
        const file = new fileModel({id: id, userId: userId})
        
        file.getByUserAndFileIds()
        .then(result => {
            
            if( result ) {
                
                const timestamp = new Date(result.updatedAt).getTime()
                res.set('Last-Modified', timestamp)
                res.set('ETag', result.version)
                res.status(200).send(serializer.serialize(result))

            } else throw new ErrorNotFound('Arquivo')
        })
        .catch(error => next(error))
    } 

    getHeadByUserAndFileIds = (req, res, next) => {

        const id = req.params.id
        const userId =  req.params.userId
        
        const file = new fileModel({id: id, userId: userId})
        
        file.load()
        .then(result => {
            
            if( result ) {
                
                const timestamp = new Date(result.updatedAt).getTime()
                res.set('Last-Modified', timestamp)
                res.set('ETag', result.version)
                res.status(200).end()

            } else throw new ErrorNotFound('Arquivo')
        })
        .catch(error => next(error))
    } 
    
    add = (req, res, next) => { 

        //tratar o upload antes e salvar o path no req.body

        const serializer = new FileSerializer(res.getHeader('Content-Type'))
        
        const file = new fileModel({userId: req.body.userId, duration: req.body.duration})

        file.add()
        .then(result => {
            
            const timestamp = new Date(result.updatedAt).getTime()
            res.set('Last-Modified', timestamp)
            res.set('ETag', result.version)
            res.set('Location', `/api/users/${result.userId}/files/${result.id}`)
            res.status(201).send(serializer.serialize(result))
        })
        .catch(error => next(error))
    } 
    
    update = (req, res, next) => {
        
        const id = req.params.id
        
        const file = new fileModel({id: id, userId: req.body.userId, duration: req.body.duration, path: req.body.path})

        file.update()
        .then(async result => {
            
            if( result[0] ) {

                result = await file.load()
                
                const timestamp = new Date(result.updatedAt).getTime()
                res.set('Last-Modified', timestamp)
                res.set('ETag', result.version)
                res.status(204).end()

            } else throw new ErrorNotFound('Arquivo')
        
        })
        .catch(error => next(error))
    } 

    delete = (req, res, next) => {

        const id = req.params.id

        const file = new fileModel({id: id})

        file.delete()
        .then(result => {

            if( result ) res.status(204).end() 

            else throw new ErrorNotFound('Arquivo')
        })
        .catch(error => next(error))
    } 

    restore = (req, res, next) => {

        const id = req.params.id
        const userId = req.params.userId

        const file = new fileModel({id: id, userId: userId})
        
        file.restore()
        .then(async result => {

            if( result[0] ){

                result = await file.load()
                
                const timestamp = new Date(result.updatedAt).getTime()
                res.set('Last-Modified', timestamp)
                res.set('ETag', result.version)
                res.status(204).end() 

            } else throw new ErrorNotFound('Arquivo')
        })
        .catch(error => next(error))
    }
}

module.exports = new fileCtrl()