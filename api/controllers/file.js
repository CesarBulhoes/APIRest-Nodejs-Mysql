const fileModel = require('../models/file') 
const FileSerializer = require('../serializer').FileSerializer

class fileCtrl {

    getList = (req, res, next) => {

        if(req.params.userId) return next()

        const serializer = new FileSerializer(res.getHeader('Content-Type'))

        const file = new fileModel({})

        file.getList()
        .then(result => res.status(200).send(serializer.serialize(result)))
        .catch(error => res.status(400).send(error))
    } 

    getListByUserId = (req, res, next) => {

        const userId = req.params.userId
        const serializer = new FileSerializer(res.getHeader('Content-Type'))

        const file = new fileModel({userId: userId})

        file.getListByUserId()
        .then(result => res.status(200).send(serializer.serialize(result)))
        .catch(error => res.status(400).send(error))
    } 
    
    getById = (req, res, next) => {

        const id = req.params.id

        if(req.params.userId) return next()
        
        const serializer = new FileSerializer(res.getHeader('Content-Type'))

        const file = new fileModel({id: id})

        file.getById()
        .then(result => res.status(200).send(serializer.serialize(result)))
        .catch(error => res.status(400).send(error))
    } 

    getByUserAndFileIds = (req, res, next) => {

        const id = req.params.id
        const userId =  req.params.userId
        const serializer = new FileSerializer(res.getHeader('Content-Type'))
        
        const file = new fileModel({id: id, userId: userId})

        file.getByUserAndFileIds()
        .then(result => res.status(200).send(serializer.serialize(result)))
        .catch(error => res.status(400).send(error))
    } 
    
    add = (req, res, next) => { 

        //tratar o upload antes e salvar o path no req.body

        const serializer = new FileSerializer(res.getHeader('Content-Type'))
        
        const file = new fileModel({userId: req.body.userId, duration: req.body.duration})

        file.add()
        .then(result => res.status(201).send(serializer.serialize(result)))
        .catch(error => res.status(400).send(error))
    } 
    
    update = (req, res, next) => {

        const id = req.params.id
        
        const file = new fileModel({id: id, userId: req.body.userId, duration: req.body.duration, path: req.body.path})

        file.update()
        .then(result => {
            
            if( result[0] ) res.status(204).end() 

            else throw new ErrorNotFound('Arquivo')
        
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

        const id = req.params.userId

        const file = new fileModel({id: id})
        
        file.restore()
        .then(result => {

            if( result[0] ) res.status(204).end() 

            else throw new ErrorNotFound('Arquivo')
        })
        .catch(error => next(error))
    }
}

module.exports = new fileCtrl()