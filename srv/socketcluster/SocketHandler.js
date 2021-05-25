const Redis = require('ioredis');
var redisClient = null;

function SocketHandler(redis) {
    redisClient = new Redis(redis);
    redisClient.on('ready', function() {
        console.log('Redis ready success');
    });
}

SocketHandler.bindKey = function(id) {
    return 'SOCKET:' + id;
};

/**
 * 添加用户
 * @param token
 * @param data
 */
SocketHandler.prototype.addUser = function(id, data) {
    redisClient.set(SocketHandler.bindKey(id), JSON.stringify(data));
};

/**
 * 移除指定的用户
 * @param td
 * @param token
 */
SocketHandler.prototype.removeUser = function(id, token) {
    redisClient.del(SocketHandler.bindKey(id, token));
};

/**
 * 更换新的token
 * @param td
 * @param token
 */
SocketHandler.prototype.updateUser = function(id, token) {
    redisClient.rename(SocketHandler.bindKey(id), SocketHandler.bindKey(token));
};

/**
 * 查询用户
 * @param td
 * @param cb 查询结果回调
 */
SocketHandler.prototype.findUser = function(td, cb) {
    //查询数据
    redisClient.get(SocketHandler.bindKey(td), function(err, data) {
        if (err) {
            console.warn('session Error', err);
            cb && cb(null);
        } else {
            var json = JSON.parse(data);
            cb && cb(json);
        }
    });
};

module.exports = SocketHandler;