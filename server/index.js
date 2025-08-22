require('dotenv').config();
const http = require('http');
const app = require('./app');

console.log('HASH_SALT =', process.env.HASH_SALT);

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || '127.0.0.1';

const httpServer = http.createServer(app);

httpServer.listen(PORT, HOST, () =>
  console.log(`Server is listening http://${HOST}:${PORT}`)
);
