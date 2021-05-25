const Redis = require('ioredis');


var redisClient = null;
function RedisHandler(redis) {
    redisClient = new Redis(redis);
    redisClient.on('ready', function () {
        console.log('Redis ready success');
    });
}

RedisHandler.bindKey = function (td, token) {
    return 'SESSION:' + td + ":" + token;
};

/**
 * 添加用户
 * @param token
 * @param data
 */
RedisHandler.prototype.addUser = function (td, token, data) {
    redisClient.set(RedisHandler.bindKey(td, token), JSON.stringify(data));
};

/**
 * 移除指定的用户
 * @param td
 * @param token
 */
RedisHandler.prototype.removeUser = function (td, token) {
    redisClient.del(RedisHandler.bindKey(td, token));
};

/**
 * 更换新的token
 * @param td
 * @param token
 * @param newToken
 */
RedisHandler.prototype.updateUser = function (td, token, newToken) {
    redisClient.rename(RedisHandler.bindKey(td, token), RedisHandler.bindKey(td, newToken));
};

/**
 * 查询用户
 * @param td
 * @param token
 * @param cb 查询结果回调
 */
RedisHandler.prototype.findUser = function (td, token, cb) {
    //查询数据
    redisClient.get(RedisHandler.bindKey(td, token), function (err, data) {
        if (err) {
            console.warn('session Error', err);
            cb && cb(null);
        } else {
            var json = JSON.parse(data);
            cb && cb(json);
        }
    });
};

module.exports = RedisHandler;