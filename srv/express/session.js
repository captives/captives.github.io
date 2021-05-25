const session = require("express-session");
// const RedisStore = require('connect-redis')(session);
// const redis_conf = require('./../config').redis;

// const redis = { ...redis_conf, ttl: 60 * 60 * 2 } //2h

const options = {
    secret: "captive",
    name: "token",
    resave: false,
    rolling: true,
    saveUninitialized: true,
    cookie: ('name', 'value', { maxAge: 12 * 60 * 1000, secure: false })
};

/**
 * options
 * secret - 用它来对session cookie签名，防止篡改
 * resave - 强制保存session即使它并没有变化 （默认： true, 建议设为：false）
 * name - cookie的名字（原属性名为 key）。（默认：’connect.sid’）
 * store - session存储实例
 * cookie - session cookie设置 （默认：{ path: ‘/‘, httpOnly: true,secure: false, maxAge: null }）
 * genid - 生成新session ID的函数 （默认使用uid2库）
 * rolling - 在每次请求时强行设置cookie，这将重置cookie过期时间（默认：false）
 * proxy - 当设置了secure cookies（通过”x-forwarded-proto” header ）时信任反向代理。当设定为true时，
 * forwarded-proto” header 将被使用。当设定为false时，所有headers将被忽略。当该属性没有被设定时，将使用Express的trust proxy。
 * saveUninitialized - 强制将未初始化的session存储。当新建了一个session且未设定属性或值时，它就处于未初始化状态。在设定一个cookie前，这对于登陆验证，减轻服务端存储压力，权限控制是有帮助的。（默认：true）
 * unset - 控制req.session是否取消（例如通过 delete，或者将它的值设置为null）。这可以使session保持存储状态但忽略修改或删除的请求（默认：keep）
 * 
 */
module.exports = session(options);