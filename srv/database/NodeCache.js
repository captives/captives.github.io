//https://www.npmjs.com/package/node-cache
const NodeCache = require('node-cache');
const cache = new NodeCache();


// class CacheStore {
//     constructor() {

//     }

//     set(key, value){
//         return cache.set(key, value);
//     }

// }

module.exports = cache;