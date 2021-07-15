const express = require('express');
const router = express.Router();
const routeValidation = require('../validations/routeValidation')
const fileCtrl = require('../controllers/file');
const fileValidation = require('../validations/fileValidation')

// Returns all files not deleted
router.get('/', fileCtrl.getList);

// Returns a file by id
router.get('/:id', fileCtrl.getById);

// Creates a new file
router.post('/', fileValidation.checkExtension, routeValidation.checkErrors, fileCtrl.add);

// Updates a file
router.put('/', fileCtrl.update);

// Sets a file as deleted
router.delete('/', fileCtrl.delete);

module.exports = function (app) {
    app.use('/files', router);
  }