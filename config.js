module.exports = {
  name: 'Estimation API',
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3001,
  base_url: process.env.BASE_URL || 'http://localhost:3001',
  db: {
    host: 'localhost',
    username: 'root',
    password: 'admin'
  },
};
