'use strict';

/**
 * Module dependencies.
 */
require('dotenv').config();
const config = require('./config');
const restify = require('restify');
const restifyPlugins = require('restify-plugins');
//const app = require('./app');
const debug = require('debug')('estimation:server');
var knex  = require('./db');


/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(config.port);
//app.set('port', port);

/**
 * Create REST server.
 */

const server = restify.createServer({
  name: config.name,
  version: config.version,
});

/**
 * Middleware
 */
server.use(restifyPlugins.jsonBodyParser({ mapParams: true }));
server.use(restifyPlugins.acceptParser(server.acceptable));
server.use(restifyPlugins.queryParser({ mapParams: true }));
server.use(restifyPlugins.fullResponse());
server.use(restifyPlugins.bodyParser());


/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port, function () {
  console.log('server started');
  var routes = require('./routes')(server, knex);
});

server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
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

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
