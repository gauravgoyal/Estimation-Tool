/**
 * Module Dependencies
 */
const errors = require('restify-errors');

module.exports = function (server, knex) {

  /**
   * GET
   */
  server.get('/', (req, res, next) => {
    res.send("Hello World");
    next();
  });

  /**
   * GET
   */
  server.get('/projects', (req, res, next) => {
    knex.select().table('projects').then(function(results) {
      res.end(JSON.stringify(results));
      next();
    })
    .catch(function(error) {
      throw error;
    })
  });

  server.get('/projects/:id', function (req, res) {
    knex('projects').where('pid', req.params.id).then(function(results) {
      res.end(JSON.stringify(results));
    })
    .catch(function(error) {
      throw error;
    })
  });

  //rest api to create a new record into mysql database
  server.post('/project', function (req, res) {
    var postData  = req.body;
    let now = Math.floor(Date.now() / 1000);
    knex('projects').insert({
      title: req.body.title || '',
      description: req.body.description || '',
      created: now,
      updated: now,
      deleted: 0
    }).then(function(results) {
      res.end(JSON.stringify(results));
    })
    .catch(function(error) {
       throw error;
    })
  });

//rest api to update record into mysql database
  server.put('/project', function (req, res) {
    let now = Math.floor(Date.now() / 1000);
    knex('projects').where('pid', req.body.pid)
    .update({
      title: req.body.title || '',
      created: now,
      updated: now,
      deleted: 0,
      description: req.body.description || ''
    }).then(function(results) {
      res.end(JSON.stringify(results));
    }).catch(function(error) {
      throw error;
    })
  });

  /**
   * Get role rates defined in a project.
   */
  server.get('/rates/:pid', (req, res) => {
    knex('rates').where('pid', req.params.pid).then(function(results) {
      res.end(JSON.stringify(results));
    })
    .catch(function(error) {
      throw error;
    })
  });

  /**
   * Save rates for a project.
   */
  server.post('/rates', function (req, res, next) {
    knex('rates').insert({
      category: req.body.category || '',
      role: req.body.role,
      rate: req.body.rate,
      pid: req.body.pid
    }).then(function(results) {
      res.end(JSON.stringify(results));
    })
    .catch(function(error) {
       throw error;
    })
  });



// //rest api to delete record from mysql database
//   server.delete('/project/:id', function (req, res) {
//     db.query('DELETE FROM `project` WHERE `pid`=?', [req.params.id], function (error, results, fields) {
//       if (error) throw error;
//       res.end('Record has been deleted!');
//     });
//   });
}
