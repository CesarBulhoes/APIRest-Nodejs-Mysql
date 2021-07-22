// var createError = require('http-errors')
const express = require('express')
const path = require('path')
const consign = require('consign')
const { promisify} = require('util') 
const fs = require('fs')
const readFile = promisify(fs.readFile)

const app = express()

app.use(express.static(path.resolve(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

consign().include('routes').into(app)


// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404))
// })

// app.use(function(err, req, res, next) {
//   res.locals.message = err.message
//   res.locals.error = req.app.get('env') === 'development' ? err : {}

//   res.status(err.status || 500)
//   res.send('error')
// })

// 

module.exports = app