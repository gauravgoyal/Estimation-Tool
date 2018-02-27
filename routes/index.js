/**
 * Module Dependencies
 */
const errors = require('restify-errors');

module.exports = function (server, db) {

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
    db.query('SELECT * FROM project', function (error, results, fields) {
      if (error) throw error;
      res.send(JSON.stringify(results));
      next();
    });
  });

  server.get('/project/:id', function (req, res) {
    db.query('SELECT * FROM project WHERE pid=?', [req.params.id], function (error, results, fields) {
      if (error) throw error;
      res.end(JSON.stringify(results));
    });
  });

  //rest api to create a new record into mysql database
  server.post('/project', function (req, res) {
    console.log(req.body);
    var postData  = req.body;
    let now = Date.now();
    db.query('INSERT INTO project SET `name`=?,`created`=?, `updated`=?, `deleted`=?', [req.body.name,now ,now, 0 ], function (error, results, fields) {
      if (error) throw error;
      res.end(JSON.stringify(results));
    });
  });

//rest api to update record into mysql database
  server.put('/project', function (req, res) {
    let now = Date.now();
    db.query('UPDATE `project` SET `name`=?,`created`=?, `updated`=?, `deleted=0', [req.body.name,now ,now ], function (error, results, fields) {
      if (error) throw error;
      res.end(JSON.stringify(results));
    });
  });

// //rest api to delete record from mysql database
//   server.delete('/project/:id', function (req, res) {
//     db.query('DELETE FROM `project` WHERE `pid`=?', [req.params.id], function (error, results, fields) {
//       if (error) throw error;
//       res.end('Record has been deleted!');
//     });
//   });
}