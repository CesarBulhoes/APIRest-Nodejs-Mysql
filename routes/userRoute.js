const express = require('express');
const router = express.Router();
const routeCtrl = require('../validations/routeCtrl')
const userCtrl = require('../controllers/userCtrl');
const userValidation = require('../validations/userValidation')

// Returns all users not deleted
router.get('/', userCtrl.getList);

// Returns a user by id
router.get('/:id', userValidation.getById, routeCtrl.checkErrors, userCtrl.getById);

// Creates a new user
router.post('/', userValidation.addUser, routeCtrl.checkErrors, userCtrl.addUser);

// Updates a user
router.put('/', userValidation.updateOrDeleteUser, routeCtrl.checkErrors, userCtrl.updateUser);

// Sets a user as deleted
router.delete('/', userValidation.updateOrDeleteUser, routeCtrl.checkErrors, userCtrl.deleteUser);

module.exports = function (app) {
    app.use('/users', router);
  }