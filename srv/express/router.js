const md5 = require('md5');
const express = require('express');
const router = express.Router();
const { create, load } = require('./../utils/identity');

router.get('/token', (req, res) => {
    console.log('签名', req.signedCookies);
    console.log('未签名', req.cookies);
    const token = req.signedCookies.token || req.cookies.token;
    const uid = load(token);
    console.log('获取token', uid, token);
    res.send(uid);
});

//动态路由
router.get('/token/:id', (req, res) => {
    // let token = md5(req.params.id);
    let token = create(req.params.id);
    res.cookie('token', token, { maxAge: 120 * 1000, httpOnly: true, secure: true, signed: true }); //, domain: 'uuabc.com' 
    console.log(req.params, "用户 token", token);
    res.send(token);
});

router.post('/save', (req, res) => {
    console.log(req.body.title, req.body.text);
    res.send(JSON.stringify({ success: true }));
});

module.exports = router;