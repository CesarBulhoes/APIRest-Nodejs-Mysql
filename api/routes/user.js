const express = require('express') 
const router = express.Router() 
const routeValidation = require('../validations/route')
const userCtrl = require('../controllers/user') 
const userValidation = require('../validations/user')
const files = require('./files/file')

// redirects to the FILES route
router.use('/:userId?/files', files)

// Returns all users not deleted
router.get('/', userCtrl.getList) 

// Returns a user by id
router.get('/:id', userValidation.getById, routeValidation.checkErrors, userCtrl.getById) 

// Creates a new user
router.post('/', userValidation.addUser, routeValidation.checkErrors, userCtrl.add) 

// Updates a user
router.put('/:id', userValidation.updateUser, routeValidation.checkErrors, userCtrl.update) 

// Sets a user as deleted
router.delete('/:id', userValidation.deleteUser, routeValidation.checkErrors, userCtrl.delete) 

module.exports = function (app) {
    app.use('/users', router) 
  }