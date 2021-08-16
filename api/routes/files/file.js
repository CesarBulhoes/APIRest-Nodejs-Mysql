const express = require('express')
const router = express.Router({ mergeParams: true })
const { checkErrors, validateId } = require('../../validations/route')
const fileCtrl = require('../../controllers/file')

router.options('/:id?', (req, res, next) => {

  res.set('Access-Control-Allow-Origin', '*')
  res.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, HEAD')
  res.set('Access-Control-Allow-Headers', 'Content-Type')
  res.status(204).end()
})

// Returns headers for a specific file. It needs to be declared before any get route with the same signature.
// Otherwise, the head request will be accepted by the GET route. GET routes in Express accepts both GET and HEAD requests.
router.head('/:id', validateId, checkErrors, fileCtrl.getHead)

// Returns files not deleted
router.get('/:id?', validateId, checkErrors, fileCtrl.getList)

// Creates a new file
router.post('/', fileCtrl.add)

// Updates a file
router.put('/:id', validateId, checkErrors, fileCtrl.update)

// Sets a file as deleted
router.delete('/:id', validateId, checkErrors, fileCtrl.delete)

module.exports = router
