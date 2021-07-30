const express = require('express') 
const router = express.Router({mergeParams: true}) 
const routeValidation = require('../../validations/route')
const fileCtrl = require('../../controllers/file') 
const fileValidation = require('../../validations/file')

router.options('/:id?', (req, res, next) => {

    res.set('Access-Control-Allow-Origin', '*')
    res.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, HEAD')
    res.set('Access-Control-Allow-Headers', 'Content-Type')
    res.status(204).end()
  })

// Returns all files not deleted
router.get('/', fileCtrl.getList, fileCtrl.getListByUserId) 

// Returns a file by id
router.get('/:id', fileCtrl.getById, fileCtrl.getByUserAndFileIds) 

router.head('/:id', fileCtrl.getHeadById, fileCtrl.getHeadByUserAndFileIds) 

// Creates a new file
router.post('/', fileValidation.checkExtension, routeValidation.checkErrors, fileCtrl.add) 

// Updates a file
router.put('/:id', fileCtrl.update) 

// Sets a file as deleted
router.delete('/:id', fileCtrl.delete) 

// Sets a file as deleted
router.post('/:id/restore', fileCtrl.restore) 

module.exports = router
