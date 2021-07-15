const app = require('../app');
const http = require('http');
const connection = require('../infrastructure/database/connection');
const tables = require('../infrastructure/database/tables')
const port = 80;// normalizePort(process.env.PORT || 80);

const server = http.createServer(app);

connection.connect(error => {
  if(error) console.log(error)
  else{
     console.log('Connected successfully to database')
     tables.init(connection)
     server.listen(port);
  }
})


server.on('error', onError);
server.on('listening', onListening);

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) { return val; }

  if (port >= 0) {return port; }

  return false;
}

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  console.log('Listening on ' + bind);
}
