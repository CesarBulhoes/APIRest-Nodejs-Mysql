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
    // tables.init(connection)
    // server.listen(port)
})
.catch(console.log)
// connection.connect(error => {
//   if(error) console.log(error)
//   else{
//      console.log('Connected successfully to database')
//      tables.init(connection)
//      server.listen(port)
//   }
// })

server.on('error', onError)
server.on('listening', onListening)

function normalizePort(val) {
  var port = parseInt(val, 10)

  if (isNaN(port)) { return val }

  if (port >= 0) {return port }

  return false
}

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port

  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges')
      process.exit(1)
      break
    case 'EADDRINUSE':
      console.error(bind + ' is already in use')
      process.exit(1)
      break
    default:
      throw error
  }
}

function onListening() {
  var addr = server.address()
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port
  console.log('Listening on ' + bind)
}

// var http = require('http')
// http.createServer(function (req, res) {
//     res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url })
//     res.end()
// }).listen(80)