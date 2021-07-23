const express = require('express') 
const router = express.Router() 
const routeValidation = require('../validations/route')
const userCtrl = require('../controllers/user') 
const userValidation = require('../validations/user')

// Returns all users not deleted
router.get('', userCtrl.getList) 

module.exports = function (app) {
    app.use('/', router) 
  }