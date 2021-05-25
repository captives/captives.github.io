const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(express.static(path.join(__dirname, './../data/dist')));

// const cookie = require('./cookie');
// app.use(cookie);

const session = require('./session');
app.use(session);

// 解析application/json数据
app.use(bodyParser.json({ limit: '50mb' }));
// 解析application/x-www-form-urlencoded数据
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(function(req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});

//live 路由
app.use('/live', require('./live'));
app.use('/user', require('./user'));
app.use('/edit', require('./markdown'));
app.use(require('./router'));

module.exports = app;