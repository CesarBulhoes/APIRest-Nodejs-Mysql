require('dotenv').config()
const spdy = require('spdy')
const app = require('../app')
const connection = require('../api/models')
const fs = require('fs')
const path = require('path')
const port = normalizePort(process.env.API_PORT || 443)

const keyPath = path.resolve('./server/bin/privkey.pem')
const certPath = path.resolve('./server/bin/cert.pem')

const options = {
  key: fs.readFileSync(keyPath),
  cert: fs.readFileSync(certPath),
} 

connection.sequelize
.sync()
.then(() => {

  console.log('Connected successfully to database')
  
    spdy.createServer(options, app).listen(port, (err) => {
      if (err) throw new Error(err)
      console.log('Listening on ' + port)
    })
})
.catch(console.log)

function normalizePort(val) {
  var port = parseInt(val, 10)

  if (isNaN(port)) { return val }

  if (port >= 0) {return port }

  return false
}

var http = require('http')
http.createServer(function (req, res) {
    res.writeHead(301, { "Location": "https://" + req.headers['host'] + (port != 443 ? ':' + port : '')  + req.url })
    res.end()
}).listen(8080)