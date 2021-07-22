const express = require('express') 
const router = express.Router() 
const routeValidation = require('../validations/routeValidation')
const userCtrl = require('../controllers/user') 
const userValidation = require('../validations/userValidation')

// Returns all users not deleted
router.get('', userCtrl.getList) 

module.exports = function (app) {
    app.use('/', router) 
  }