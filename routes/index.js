/**
 * Module Dependencies
 */
const errors = require('restify-errors');

module.exports = function(server) {

  /**
   * GET
   */
  server.get('/', (req, res, next) => {
      res.send("Hello World");
      next();
    });
}