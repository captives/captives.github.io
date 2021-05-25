const MySQLHandler = require('./MySQLHandler');
const cacheStore = new MySQLHandler();

module.exports = cacheStore;