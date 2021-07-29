const express = require('express') 
const router = express.Router({mergeParams: true}) 
const routeValidation = require('../../validations/route')
const fileCtrl = require('../../controllers/file') 
const fileValidation = require('../../validations/file')

// Returns all files not deleted
router.get('/', fileCtrl.getList, fileCtrl.getListByUserId) 

// Returns a file by id
router.get('/:id', fileCtrl.getById, fileCtrl.getByUserAndFileIds) 

// Creates a new file
router.post('/', fileValidation.checkExtension, routeValidation.checkErrors, fileCtrl.add) 

// Updates a file
router.put('/:id', fileCtrl.update) 

// Sets a file as deleted
router.delete('/:id', fileCtrl.delete) 

module.exports = router
