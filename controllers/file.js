const fileModel = require('../models/file') 

class fileCtrl {

    getList = (req, res, next) => {

        fileModel.getList()
        .then(list => res.status(200).send(list))
        .catch(error => res.status(400).send(error))
    } 
    
    getById = (req, res, next) => {

        const id = req.params.id

        fileModel.getById(id)
        .then(file => res.status(200).send(file))
        .catch(error => res.status(400).send(error))
    } 
    
    add = (req, res, next) => {

        req.body.buffer = (req.body.buffer ? req.body.buffer : "d.png")

        const file = req.body
        
        fileModel.add(file)
        .then(file => res.status(200).send(file))
        .catch(error => res.status(400).send(error))
    } 
    
    update = (req, res, next) => {

        const file = req.body
        
        fileModel.update(file)
        .then(file => res.status(200).send(file))
        .catch(error => res.status(400).send(error))
    } 
    
    delete = (req, res, next) => {

        const file = req.body

        fileModel.delete(file)
        .then(file => res.status(200).send(file))
        .catch(error => res.status(400).send(error))
    } 
}

module.exports = new fileCtrl()