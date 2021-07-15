const userModel = require('../models/user')

class userCtrl {

    getList = (req, res, next) => {

        userModel.getList()
        .then(list => res.status(200).send(list))
        .catch(error => res.status(400).send(error))
    }
    
    getById = (req, res, next) => {

        const id = req.params.id

        userModel.getById(id)
        .then(user => res.status(200).send(user))
        .catch(error => res.status(400).send(error))
    }
    
    add = (req, res, next) => {
        
        const user = req.body

        userModel.add(user)
        .then(user => res.status(201).send(user))
        .catch(error => res.status(400).send(error))
    }
    
    update = (req, res, next) => {

        const user = req.body

        userModel.update(user)
        .then(user => res.status(200).send(user))
        .catch(error => res.status(400).send(error))
    }
    
    delete = (req, res, next) => {

        const user = req.body

        userModel.delete(user, res)
        .then(user => res.status(200).send(user))
        .catch(error => res.status(400).send(error))
    }
}

module.exports = new userCtrl()