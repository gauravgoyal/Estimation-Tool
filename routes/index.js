/**
 * Module Dependencies
 */
const errors = require('restify-errors');
const qs = require('querystring');
const util = require('util');

module.exports = function (server, knex) {
  /**
   * GET
   */
  server.get('/', (req, res, next) => {
    res.send('Hello World');
    next();
  });

  /**
   * GET
   */
  server.get('/projects', (req, res, next) => {
    knex.select().table('projects').then((results) => {
      res.end(JSON.stringify(results));
      next();
    })
      .catch((error) => {
        throw error;
      });
  });
  server.get('/global-rate', (req, res, next) => {
  	knex.select().table('global_rate').then((results) => {
      res.end(JSON.stringify(results));
  	  next();
  	})
  	.catch((error) => {
  	  throw error;
  	});
  });

  server.get('/projects/:id', (req, res) => {
    knex('projects').where('pid', req.params.id)
      .then((results) => {
        const response = {
          result: results,
          status: 200,
        };
        res.end(JSON.stringify(response));
      })
      .catch((error) => {
        const response = {
          error,
          status: 503,
        };
        res.end(JSON.stringify(response));
      });
  });

  server.post('/project-total/update/:pid', (req, res) => {
    const now = Math.floor(Date.now() / 1000);
    knex('projects').where('pid', req.params.pid)
      .update({
        estimated_hours: req.body.estimated_hours || 0,
        low_estimated_hours: req.body.low_estimated_hours || 0,
        high_estimated_hours: req.body.high_estimated_hours || 0,
        low_estimated_cost: req.body.low_estimated_cost || 0,
        high_estimated_cost: req.body.high_estimated_cost || 0,
      }).then((results) => {
        const response = {
          result: results,
          status: 200,
        };
        res.end(JSON.stringify(response));
      })
      .catch((error) => {
        const response = {
          error,
          status: 503,
        };
        res.end(JSON.stringify(response));
      });
  });

  // rest api to create a new record into mysql database
  server.post('/project', (req, res) => {
    const now = Math.floor(Date.now() / 1000);
    knex('projects').insert({
      title: req.body.title || '',
      description: req.body.description || '',
      creator: req.body.creator || '',
      owner: req.body.owner || '',
      reviewer: req.body.reviewer || '',
      signer: req.body.signer || '',
      mlid: req.body.mlid || '',
      type: req.body.type || 1,
      currency: req.body.currency || 'USD',
      created: now,
      updated: now,
      deleted: 0,
    }).then((results) => {
      const response = {
        result: results,
        status: 200,
      };
      res.end(JSON.stringify(response));
    })
      .catch((error) => {
        const response = {
          error,
          status: 503,
        };
        res.end(JSON.stringify(response));
      });
  });

  // rest api to update record into mysql database
  server.post('/project/update/:pid', (req, res) => {
    const now = Math.floor(Date.now() / 1000);
    knex('projects').where('pid', req.params.pid)
      .update({
        title: req.body.title,
        description: req.body.description,
        creator: req.body.creator,
        owner: req.body.owner,
        reviewer: req.body.reviewer,
        signer: req.body.signer,
        mlid: req.body.mlid,
        type: 1,
        updated: now,
      }).then((results) => {
        const response = {
          result: results,
          status: 200,
        };
        res.end(JSON.stringify(response));
      })
      .catch((error) => {
        const response = {
          error,
          status: 503,
        };
        res.end(JSON.stringify(response));
      });
  });

  /**
   * Get role rates defined in a project.
   */
  server.get('/rates/:pid', (req, res) => {
    knex('rates').where('pid', req.params.pid).then((results) => {
      res.end(JSON.stringify(results));
    })
      .catch((error) => {
        throw error;
      });
  });

  /**
   * Save rates for a project.
   */
  server.post('/rates', (req, res) => {
    const data = [];
    Object.keys(req.body).map((key) => {
      data.push(qs.parse(req.body[key]));
    });
    knex('rates').insert(data).then((results) => {
      res.end(JSON.stringify(results));
    })
      .catch((error) => {
        throw error;
      });
  });

  server.post('/global_rates_create', (req, res) => {
    knex('global_rate').insert({
      cost: req.body.cost || '',
      role: req.body.role || '',
      rate: req.body.rate || '',
    }).then((results) => {
      const response = {
        result: results,
        status: 200,
      };
      res.end(JSON.stringify(response));
    })
      .catch((error) => {
        const response = {
          error,
          status: 503,
        };
        res.end(JSON.stringify(response));
      });
  });

  /**
   * Updates rates for rates globally.
   */
  server.post('/global-rate/update/:rid', (req, res, next) => {
    const insert = knex('global_rate').insert({
      rid: req.body.rid,
      role: req.body.role,
      rate: req.body.rate,
      cost: req.body.cost,
    });

    const update = knex('global_rate')
      .update({
        role: req.body.role,
        rate: req.body.rate,
        cost: req.body.cost,
      });

    const query = util.format(
      '%s ON DUPLICATE KEY UPDATE %s',
      insert.toString(),
      update.toString().replace(/^update\s.*\sset\s/i, ''),
    );

    knex.raw(query).then((results) => {
      const response = {
        result: results,
        status: 200,
      };
      res.end(JSON.stringify(response));
    }).catch((error) => {
      const response = {
        error,
        status: 503,
      };
      res.end(JSON.stringify(response));
    });
  });


  /**
   * Updates rates for a project.
   */
  server.post('/rates/update/:rid', (req, res, next) => {
    const insert = knex('rates').insert({
      pid: req.body.pid,
      rid: req.params.rid,
      role: req.body.role,
      rate: req.body.rate,
      cost: req.body.cost,
      role_type: req.body.role_type,
      resource_type: req.body.resource_type,
    });

    const update = knex('rates')
      .update({
        role: req.body.role,
        rate: req.body.rate,
        cost: req.body.cost,
        role_type: req.body.role_type,
        resource_type: req.body.resource_type,
      });

    const query = util.format(
      '%s ON DUPLICATE KEY UPDATE %s',
      insert.toString(),
      update.toString().replace(/^update\s.*\sset\s/i, ''),
    );

    knex.raw(query).then((results) => {
      const response = {
        result: results,
        status: 200,
      };
      res.end(JSON.stringify(response));
    }).catch((error) => {
      const response = {
        error,
        status: 503,
      };
      res.end(JSON.stringify(response));
    });
  });

  /**
   * Save uncertainity factors for a project.
   */
  server.post('/factors', (req, res) => {
    const data = [];
    Object.keys(req.body).map((key) => {
      data.push(qs.parse(req.body[key]));
    });
    knex('uncertainity_factors').insert(data).then((results) => {
      res.end(JSON.stringify(results));
    })
      .catch((error) => {
        throw error;
      });
  });

  /**
   * Updates uncertainity factors for a project.
   */
  server.post('/factors/update/:ufid', (req, res, next) => {
    const insert = knex('uncertainity_factors').insert({
      pid: req.body.pid,
      ufid: req.params.ufid,
      title: req.body.title,
      points: req.body.points,
      lower_multiplier: req.body.lower_multiplier,
      heigher_multiplier: req.body.heigher_multiplier,
    });

    const update = knex('uncertainity_factors')
      .update({
        title: req.body.title,
        points: req.body.points,
        lower_multiplier: req.body.lower_multiplier,
        heigher_multiplier: req.body.heigher_multiplier,
      });

    const query = util.format(
      '%s ON DUPLICATE KEY UPDATE %s',
      insert.toString(),
      update.toString().replace(/^update\s.*\sset\s/i, ''),
    );

    knex.raw(query).then((results) => {
      const response = {
        result: results,
        status: 200,
      };
      res.end(JSON.stringify(response));
    }).catch((error) => {
      const response = {
        error,
        status: 503,
      };
      res.end(JSON.stringify(response));
    });
  });

  /**
   * Get uncertainity factors defined in a project.
   */
  server.get('/factors/:pid', (req, res) => {
    knex('uncertainity_factors').where('pid', req.params.pid).then((results) => {
      res.end(JSON.stringify(results));
    })
      .catch((error) => {
        throw error;
      });
  });

  /**
   * Save tasks for a project.
   */
  server.post('/tasks', (req, res) => {
    knex('tasks').insert({
      pid: req.body.pid,
      ufid: req.body.ufid,
      rid: req.body.rid,
      title: req.body.title,
      hours_low: req.body.hours_low,
      hours_high: req.body.hours_high,
      assumptions: req.body.assumptions || '',
      estimated_hours: req.body.estimated_hours,
      rate_low: req.body.rate_low,
      hours_high: req.body.hours_high,
      rate_high: req.body.rate_high,
    }).then((results) => {
      res.end(JSON.stringify(results));
    })
      .catch((error) => {
        throw error;
      });
  });

  /**
   * Get role rates defined in a project.
   */
  server.get('/tasks/:pid', (req, res) => {
    knex('tasks').where('pid', req.params.pid).then((results) => {
      res.end(JSON.stringify(results));
    })
      .catch((error) => {
        throw error;
      });
  });

  /**
   * Updates taks for a project.
   */
  server.post('/tasks/update/:pid', (req, res, next) => {
    knex('tasks').where({
      pid: req.body.pid,
      tid: req.body.tid,
    })
      .update({
        ufid: req.body.ufid,
        rid: req.body.rid,
        title: req.body.title,
        hours_low: req.body.hours_low,
        hours_high: req.body.hours_high,
        assumptions: req.body.assumptions || '',
        estimated_hours: req.body.estimated_hours,
        rate_low: req.body.rate_low,
        hours_high: req.body.hours_high,
        rate_high: req.body.rate_high,
      }).then((results) => {
        const response = {
          result: results,
          status: 200,
        };
        res.end(JSON.stringify(response));
      })
      .catch((error) => {
        const response = {
          error,
          status: 503,
        };
        res.end(JSON.stringify(response));
      });
  });

  server.post('/resource-plan/create', (req, res) => {
    knex('resource_plans').insert({
      pid: req.body.pid,
      weeks: req.body.weeks,
    }).then((results) => {
      res.end(JSON.stringify(results));
    })
      .catch((error) => {
        throw error;
      });
  });

  /**
   * Updates resource plan for a project.
   */
  server.post('/resource-plan/update/:res_id', (req, res, next) => {
    const insert = knex('resource_plans').insert({
      res_id: req.params.res_id,
      pid: req.body.pid,
      weeks: req.body.weeks,
      lock: req.body.lock,
    });

    const update = knex('resource_plans')
      .update({
        weeks: req.body.weeks,
        lock: req.body.lock,
      });

    const query = util.format(
      '%s ON DUPLICATE KEY UPDATE %s',
      insert.toString(),
      update.toString().replace(/^update\s.*\sset\s/i, ''),
    );

    knex.raw(query).then((results) => {
      const response = {
        result: results,
        status: 200,
      };
      res.end(JSON.stringify(response));
    }).catch((error) => {
      const response = {
        error,
        status: 503,
      };
      res.end(JSON.stringify(response));
    });
  });

  server.post('resource-plan/allocation/add/:resid', (req, res) => {
    const data = [];
    Object.keys(req.body).map((key) => {
      data.push(qs.parse(req.body[key]));
    });
    knex('resource_allocations').insert(data).then((results) => {
      res.end(JSON.stringify(results));
    })
      .catch((error) => {
        throw error;
      });
  });

  /**
   * Get resource plan defined in the project.
   */
  server.get('/resource-plans/:pid', (req, res) => {
    knex('resource_plans').where('pid', req.params.pid).then((results) => {
      res.end(JSON.stringify(results));
    })
      .catch((error) => {
        throw error;
      });
  });

  /**
   * Get resource plan allocations defined in the resource plan.
   */
  server.get('/resource-plan/allocation/fetch/:resId', (req, res) => {
    knex('resource_allocations').where('res_id', req.params.resId).then((results) => {
      res.end(JSON.stringify(results));
    })
      .catch((error) => {
        throw error;
      });
  });

  server.post('/resource-plan/allocation/remove/:resid/:week', (req, res) => {
    knex('resource_allocations')
      .where({
        res_id: req.params.resid,
        week: req.params.week,
      })
      .del()
      .then((results) => {
        res.end(JSON.stringify(results));
      })
      .catch((error) => {
        throw error;
      });
  });

  server.post('resource-plan/allocation/update', (req, res) => {
    const insert = knex('resource_allocations').insert({
      res_id: req.body.resId,
      rid: req.body.rid,
      week: req.body.week,
      week_name: req.body.weekName,
      hours: req.body.hours,
      row: req.body.row,
    });

    const update = knex('resource_allocations')
      .update({
        week_name: req.body.weekName,
        hours: req.body.hours,
      });

    const query = util.format(
      '%s ON DUPLICATE KEY UPDATE %s',
      insert.toString(),
      update.toString().replace(/^update\s.*\sset\s/i, ''),
    );

    knex.raw(query).then((results) => {
      const response = {
        result: results,
        status: 200,
      };
      res.end(JSON.stringify(response));
    }).catch((error) => {
      const response = {
        error,
        status: 503,
      };
      res.end(JSON.stringify(response));
    });
  });


// //rest api to delete record from mysql database
//   server.delete('/project/:id', function (req, res) {
//     db.query('DELETE FROM `project` WHERE `pid`=?', [req.params.id], function (error, results, fields) {
//       if (error) throw error;
//       res.end('Record has been deleted!');
//     });
//   });
};
