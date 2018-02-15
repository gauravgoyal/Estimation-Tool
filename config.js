module.exports = {
  name: 'Estimation API',
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3001,
  base_url: process.env.BASE_URL || 'http://localhost:3001',
  db: {
    uri: process.env.MYSQL_URI || 'mysql://root@127.0.0.1/estimation',
  },
};