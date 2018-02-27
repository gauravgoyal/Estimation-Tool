// Update with your config settings.
var config = require('./config');
module.exports = {

  development: {
    client: 'mysql',
    connection: {
      database: 'estimation',
      host: config.db.host,
      user: config.db.username,
      password: config.db.password
    }
  }
};
