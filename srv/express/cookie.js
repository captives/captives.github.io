const cookieParser = require("cookie-parser");
const cookie = cookieParser('secret');//签名cookie,名称为:secret

/**
 * A、设置cookie
 * res.cookie("name",'zhangsan',{maxAge: 900000, httpOnly: true});
 * 
 * domain: 域名 
 * name = value：键值对，可以设置要保存的 Key/Value，注意这里的 name 不能和其他属性项的名字一样
 * expires： 过期时间（秒）
 * maxAge： 最大失效时间（毫秒），设置在多少后失效
 * secure： 当 secure 值为 true 时，cookie 在 HTTP 中是无效，在 HTTPS 中才有效
 * Path： 表示 在那个路由下可以访问到cookie
 * httpOnly：选项设为true 表明这个cookie 只能由服务器修改。
 * singed：表示是否签名cookie,设置true,需要通过res.signedCookies,不设置需要通过req.cookies
 * 
 * B、获取cookie
 * req.cookies.name;
 * 
 * C、删除cookie
 * res.clearCookie('secret');
 */
module.exports = cookie;
