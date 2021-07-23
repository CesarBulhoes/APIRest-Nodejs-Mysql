const express = require('express')
const path = require('path')
const consign = require('consign')
const NotFound = require('./errors/notFound')
const NotAcceptedType = require('./errors/notAcceptedType')
const acceptedTypes = require('./api/serializer').acceptedTypes
const ErrorSerializer = require('./api/serializer').ErrorSerializer
const IncorrectInput = require('./errors/incorrectInput')
const app = express()

app.use(express.static(path.resolve(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use((req, res, next) => {

    let requiredType = req.header('Accept')

    if(requiredType === '*/*') requiredType = 'application/json'
    
    if(acceptedTypes.indexOf(requiredType) === -1) throw new NotAcceptedType(requiredType)
    
    res.setHeader('Content-Type', requiredType)

    next()
})

consign().include('api/routes').into(app)

app.use((error, req, res, next) => {
    
    let status = (error.status || 500)

    const errorSerializer = new ErrorSerializer(res.getHeader('Content-Type'))

    res.status(status).send(errorSerializer.serialize(error))   
})

    // res.status(status).send(errorSerializer.serialize(error))   


module.exports = app