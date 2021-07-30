const express = require('express') 
const router = express.Router() 
const routeValidation = require('../validations/route')
const userCtrl = require('../controllers/user') 
const userValidation = require('../validations/user')
const files = require('./files/file')



// redirects to the FILES route
router.use('/:userId?/files', userCtrl.checkUserById, files)

router.options('/:id?', (req, res, next) => {

  res.set('Access-Control-Allow-Origin', '*')
  res.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, HEAD')
  res.set('Access-Control-Allow-Headers', 'Content-Type')
  res.status(204).end()
})

// Returns all users not deleted
router.get('/', userCtrl.getList) 

// Returns a user by id
router.get('/:id', userValidation.getById, routeValidation.checkErrors, userCtrl.getById) 

router.head('/:id', userValidation.getById, routeValidation.checkErrors, userCtrl.getHeadById) 

// Creates a new user
router.post('/', userValidation.addUser, routeValidation.checkErrors, userCtrl.add) 

// Updates a user
router.put('/:id', userValidation.updateUser, routeValidation.checkErrors, userCtrl.checkUserById, userCtrl.update) 

// Sets a user as deleted
router.delete('/:id', userValidation.deleteUser, routeValidation.checkErrors, userCtrl.checkUserById, userCtrl.delete) 

// Restores previously deleted user
router.post('/:id/restore', userValidation.deleteUser, routeValidation.checkErrors, userCtrl.restore) 

module.exports = function (app) {
    app.use('/api/users', router) 
  }