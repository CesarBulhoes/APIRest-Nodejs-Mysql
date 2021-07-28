const fileModel = require('../models/file') 
const FileSerializer = require('../serializer').FileSerializer

class fileCtrl {

    getList = (req, res, next) => {

        if(req.params.userId) return next()

        const serializer = new FileSerializer(res.getHeader('Content-Type'))

        fileModel.getList()
        .then(result => res.status(200).send(serializer.serialize(result)))
        .catch(error => res.status(400).send(error))
    } 

    getListByUserId = (req, res, next) => {

        const userId = req.params.userId
        const serializer = new FileSerializer(res.getHeader('Content-Type'))

        fileModel.getListByUserId(userId)
        .then(result => res.status(200).send(serializer.serialize(result)))
        .catch(error => res.status(400).send(error))
    } 
    
    getById = (req, res, next) => {

        const id = req.params.id

        if(req.params.userId) return next()
        
        const serializer = new FileSerializer(res.getHeader('Content-Type'))

        fileModel.getById(id)
        .then(result => res.status(200).send(serializer.serialize(result)))
        .catch(error => res.status(400).send(error))
    } 

    getByUserAndFileIds = (req, res, next) => {

        const id = req.params.id
        const userId =  req.params.userId
        const serializer = new FileSerializer(res.getHeader('Content-Type'))
        
        fileModel.getByUserAndFileIds(id, userId)
        .then(result => res.status(200).send(serializer.serialize(result)))
        .catch(error => res.status(400).send(error))
    } 
    
    add = (req, res, next) => { 

        const file = req.body
        const serializer = new FileSerializer(res.getHeader('Content-Type'))

        fileModel.add(file)
        .then(result => res.status(201).send(serializer.serialize(result)))
        .catch(error => res.status(400).send(error))
    } 
    
    update = (req, res, next) => {

        const file = req.body
        const id = req.params.fileId
        
        fileModel.update(id, file)
        .then(result => {
            
            if( result[0] ) res.status(204).end() 

            else throw new ErrorNotFound('Arquivo')
        
        })
        .catch(error => next(error))
    } 
    
    delete = (req, res, next) => {

        const id = req.params.fileId

        fileModel.delete(id)
        .then(result => {

            if( result ) res.status(204).end() 

            else throw new ErrorNotFound('Arquivo')
        })
        .catch(error => next(error))
    } 
}

module.exports = new fileCtrl()