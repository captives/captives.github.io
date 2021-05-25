const md5 = require('md5');
const express = require('express');
const router = express.Router();
const { create, load } = require('./../utils/identity');
// const cacheStore = require('./../database/CacheStore');

router.use((req, res, next) => {
    console.log(`路由执行成功啦~~~`, req.session);
    if (req.session.user || ["/create", "/register"].indexOf(req.url) != -1) {
        next();
    } else {
        res.send(JSON.stringify({ success: false, code: 10001 }));
    }
})

//登入
router.post('/create', (req, res) => {
    console.log(req.body.name, req.body.password);
    if (req.body.name === 'admin' && req.body.password === '123456') {
        let token = create(JSON.stringify({
            name: req.body.name,
            password: req.body.password,
            time: Date.now()
        }))
        req.session.user = token;
        res.send(JSON.stringify({ success: true, token }));
    } else {
        res.send(JSON.stringify({ success: false }));
    }
});

// 用户信息
router.post('/user', (req, res) => {
    console.log('user', req.session.user);
    const token = req.session.user;
    const user = JSON.parse(load(token));
    res.send(JSON.stringify({ success: true, user }));
});

// 登出
router.post('/destory', (req, res) => {
    req.session.destroy();
    res.send(JSON.stringify({ success: true }));
});

module.exports = router;

/*
router.use((req, res, next) => {
    const token = req.signedCookies.token
    console.log(`路由执行成功啦~~~`, req.session);
    if (token || req.url == "/create") {
        next();
    } else {
        res.send(JSON.stringify({ success: false, code: 10001 }));
    }
})

//登入
router.post('/create', (req, res) => {
    console.log(req.body.name, req.body.password);
    if (req.body.name === 'admin' && req.body.password === '123456') {
        let token = create(JSON.stringify({
            name: req.body.name,
            password: req.body.password,
            time: Date.now()
        }))
        res.cookie('token', token, { maxAge: 12 * 60 * 1000, httpOnly: true, secure: true, signed: true });
        res.send(JSON.stringify({ success: true, token }));
    } else {
        res.send(JSON.stringify({ success: false }));
    }
});

// 用户信息
router.post('/user', (req, res) => {
    const token = req.signedCookies.token || req.cookies.token;
    const user = JSON.parse(load(token));
    res.send(JSON.stringify({ success: true, user }));
});

// 登出
router.post('/destory', (req, res) => {
    res.clearCookie('token');
    res.send(JSON.stringify({ success: true }));
}); */