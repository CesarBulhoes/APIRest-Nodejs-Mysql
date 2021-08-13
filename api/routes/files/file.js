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

  
// Returns headers for a specific file. It needs to be declared before any get route with the same signature.
// Otherwise, the head request will be accepted by the GET route. GET routes in Express accepts both GET and HEAD requests.
router.head('/:id', fileCtrl.getHead) 

// Returns files not deleted
router.get('/:id?', fileCtrl.getList) 


// Creates a new file
router.post('/', fileValidation.checkExtension, routeValidation.checkErrors, fileCtrl.add) 

// Updates a file
router.put('/:id', fileCtrl.update) 

// Sets a file as deleted
router.delete('/:id', fileCtrl.delete) 

module.exports = router
