const spdy = require('spdy')
const app = require('../app')
const https = require('http')
const connection = require('../infrastructure/database/connection')
const config = require('config')
const fs = require('fs')
const port = normalizePort(config.get('api.port') || 443)

const server = https.createServer(app)

const options = {
  key: fs.readFileSync("bin\\privkey.pem"),
  cert: fs.readFileSync("bin\\cert.pem"),
} 

connection
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