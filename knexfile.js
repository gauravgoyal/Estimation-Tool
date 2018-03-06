// Update with your config settings.
const config = require('./config');

module.exports = {

  development: {
    client: 'mysql',
    connection: {
      database: process.env.DB_NAME || 'estimation',
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASS || ''
    }
  }
};
