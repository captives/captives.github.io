const http = require('http');
const https = require('https');
const fs = require('fs');
const schedule = require('node-schedule');
const app = require('./express');


const webrtc = require('./recorder/webrtc');
webrtc.run(app);

const xxjc = require('./recorder/xxjc');
/******************************************************
 * 秒、分、时、日、月、周
    *  *  *  *  *  *
    ┬ ┬ ┬ ┬ ┬ ┬
    │ │ │ │ │ └ day of week (0 - 7) (0 or 7 is Sun)
    │ │ │ │ └───── month (1 - 12)
    │ │ │ └────────── day of month (1 - 31)
    │ │ └─────────────── hour (0 - 23)
    │ └──────────────────── minute (0 - 59)
    └───────────────────────── second (0 - 59, OPTIONAL)
****************************************************/
//每天凌晨1点
schedule.scheduleJob('0 0 1 * * *', () => {
    xxjc([
        { emil: "157676608@qq.com", pwd: "Seven123456" },
        { emil: "593278382@qq.com", pwd: "zhao123456" },
    ], true);
});
console.log('小小机场 自动签到任务开启', new Date().toLocaleString('chinese', 12));


const XtermSocket = require('./socket/xterm');
const SocketServer = require('./socket/SocketServer');
const RecorderSocket = require('./recorder/socket');
const httpServer = http.createServer(app).listen(2010, () => {
    console.log('服务启动完成', httpServer.address().port);
    const socket = new SocketServer(httpServer, '/live');
    const recorder = new RecorderSocket(httpServer);
});;

const options = {
    key: fs.readFileSync('./ssl/uuabc_com.key'),
    cert: fs.readFileSync('./ssl/uuabc_com_bundle.crt'),
    passphrase: 'passphase4privkey',
};

//解决读取证书异常
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const httpsServer = https.createServer(options, app).listen(2020, (req, res) => {
    console.log('服务启动完成', httpsServer.address().port);

    const xterm = new XtermSocket(httpsServer, '/xterm');
    const socket = new SocketServer(httpsServer, '/metting');
    // const recorder = new RecorderSocket(httpsServer);
});

const config = require('./config');