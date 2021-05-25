const redis = require('redis');
const conf = require('./../config/index').redis;

class RedisClient {
    connected = false;
    client = null;
    constructor() { }

    create = (options) => {
        return new Promise((resolve, reject) => {
            const client = redis.createClient(options || conf.redis);
            this.connected = false;
            client.on('ready', () => {
                console.log('Redis :: ready ----', JSON.stringify(options));
                this.connected = true;
                this.client = client;
                resolve(client);
            });

            client.on('error', (err) => {
                console.log('Redis :: error ----', JSON.stringify(options));
                this.connected = false;
                this.client = null;
                reject(err);
            });
        });
    }

    set = () => {
        
    }
}

module.exports = RedisClient;