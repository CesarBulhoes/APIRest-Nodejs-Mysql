const express = require('express')
const path = require('path')
const { ErrorNotAcceptedType } = require('./errors')
const acceptedTypes = require('./api/serializer').acceptedTypes
const ErrorSerializer = require('./api/serializer').ErrorSerializer
const { loadRoutes, getRequiredType } = require('./infrastructure/functions/appFunctions')
const app = express()

const { AuthenticationServices } = require('./api/services')

app.use(express.static(path.resolve(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use((req, res, next) => {

    let requiredType = req.header('Accept')
    requiredType = getRequiredType(requiredType, acceptedTypes)
    
    if (!requiredType) throw new ErrorNotAcceptedType(requiredType)

    const developedBy = process.env.DEVELOPED_BY

    res.setHeader('X-Powered-By', developedBy)
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Content-Type', requiredType)

    next()
})

loadRoutes(app)

app.use((error, req, res, next) => {

    let status = (error.status || 500)

    const errorSerializer = new ErrorSerializer(res.getHeader('Content-Type'))

    if(error.errors) error = error.errors

    if(error.message == "Unknown column 'NaN' in 'where clause'"){
        error.message = "Not a Number Error."
    }
    
    res.status(status).send(errorSerializer.serialize(error))
}) 

module.exports = app