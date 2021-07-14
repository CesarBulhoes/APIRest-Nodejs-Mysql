const express = require('express');
const router = express.Router();
const routeCtrl = require('../validations/routeCtrl')
const fileCtrl = require('../controllers/fileCtrl');
// const fileValidation = require('../validations/fileValidation')

// Returns all files not deleted
router.get('/', fileCtrl.getList);

// Returns a file by id
router.get('/:id', fileCtrl.getById);

// Creates a new file
router.post('/', fileCtrl.addFile);

// Updates a file
router.put('/', fileCtrl.updateFile);

// Sets a file as deleted
router.delete('/', fileCtrl.deleteFile);

module.exports = function (app) {
    app.use('/files', router);
  }