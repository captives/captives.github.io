const qsUrl = require('qs-url');
qsUrl.setBaseUrl('http://www.bolin.site/user/?id=1&status=success#/user/info?name=lbl&userId=456')
const urlInfo = qsUrl.parseUrl();
console.log(urlInfo);