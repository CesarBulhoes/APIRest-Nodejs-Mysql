const express = require('express') 
const router = express.Router() 
const { checkErrors, validateId } = require('../validations/route')
const userCtrl = require('../controllers/user') 
const files = require('./files/file')

// redirects to the FILES route
router.use('/:userId?/files', files)

router.options('/:id?', (req, res, next) => {

  res.set('Access-Control-Allow-Origin', '*')
  res.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, HEAD')
  res.set('Access-Control-Allow-Headers', 'Content-Type')
  res.status(204).end()
})

// Returns all users not deleted
router.get('/', userCtrl.getList) 

// It needs to be declared before any get route with the same signature.
// Otherwise, the head request will be accepted by the GET route. GET routes in Express accepts both GET and HEAD requests.
router.head('/:id', validateId, checkErrors, userCtrl.getHeadById) 

// Returns a user by id
router.get('/:id', validateId, checkErrors, userCtrl.getById) 

// Creates a new user
router.post('/', userCtrl.add) 

// Updates a user
router.put('/:id', validateId, checkErrors, userCtrl.checkUserById, userCtrl.update) 

// Sets a user as deleted
router.delete('/:id', validateId, checkErrors, userCtrl.checkUserById, userCtrl.delete) 

// Restores previously deleted user
router.post('/:id/restore', validateId, checkErrors, userCtrl.restore) 

module.exports = function (app) {
    app.use('/api/users', router) 
  }