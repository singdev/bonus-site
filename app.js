const server = require('./src/driver/web');
const database = require('./src/driver/database/mongodb');

database();
server();