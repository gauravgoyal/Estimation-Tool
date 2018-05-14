module.exports = {
  name: 'Estimation API',
  env: process.env.NODE_ENV || 'development',
  port: process.env.API_PORT || process.env.PORT || 3001,
  web_port: process.env.API_PORT || process.env.PORT || 8080,
  base_url: process.env.BASE_URL || 'http://localhost:3001'
};
