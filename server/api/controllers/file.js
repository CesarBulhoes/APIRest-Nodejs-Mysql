const { ErrorNotFound } = require('../../errors')
const { FileSerializer } = require('../serializer')
const { FileServices } = require('../services')
const fileServices = new FileServices()

class FileCtrl {

    getList = (req, res, next) => {
        
        const serializer = new FileSerializer(res.getHeader('Content-Type'))
        const query = { id: req.params.id, userId: req.params.userId, ...req.query }
        
        fileServices.getAll(query)
        .then(result => {
            
            if( result ) {

                if(query.id){
                    
                    const timestamp = new Date(result.rows[0].updatedAt)
                    res.set('Last-Modified', timestamp)
                    res.set('ETag', result.rows[0].version)
                }
                
                if(req.method === "GET") res.status(200).send(serializer.serialize(result))
                else res.status(200).end()

            } else throw new ErrorNotFound('Arquivo')
        })
        .catch(error => next(error))
    } 

    getHead = (req, res, next) => {
        
        const id = req.params.id

        fileServices.load(id)
        .then(result => {

            if( result ) {
                
                const timestamp = new Date(result.updatedAt)
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
        
        const file = {
            userId: req.user.id, 
            duration: req.body.duration | 100, //remover 100
            path: 'path'
        }

        fileServices.add(file)
        .then(result => {
            
            const timestamp = new Date(result.updatedAt)
            res.set('Last-Modified', timestamp)
            res.set('ETag', result.version)
            res.set('Location', `/api/users/${result.userId}/files/${result.id}`)
            res.status(201).send(serializer.serialize(result))
        })
        .catch(error => next(error))
    } 
    
    update = async (req, res, next) => {
        
        const id = req.params.id

        fileServices.update(req.body, { id: id })
        .then(async result => {
            
            if( result ) {

                result = await fileServices.getById(id)
                
                const timestamp = new Date(result.updatedAt)
                res.set('Last-Modified', timestamp)
                res.set('ETag', result.version)
                res.status(204).end()

            } else throw new ErrorNotFound('Arquivo')
        
        })
        .catch(error => next(error))
    } 

    delete = (req, res, next) => {

        const id = req.params.id

        fileServices.delete(id)
        .then(result => {

            if( result ) res.status(204).end() 

            else throw new ErrorNotFound('Arquivo')
        })
        .catch(error => next(error))
    } 
}

module.exports = new FileCtrl()