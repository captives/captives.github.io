const express = require('express');
const router = express.Router();
// const cacheStore = require('./../database/CacheStore');

router.use((req, res, next) => {
    console.log(`路由执行成功啦~~~`, req.session);
    next();
})

router.post('/register', (req, res) => {
    console.log(req.body.name, req.body.password);

    const sql = "INSERT INTO blog(title, content) VALUES(?, ?)";
    const params = [req.body.name, req.body.password];
    // cacheStore.query(sql, params).then(result => {
    //     res.send(JSON.stringify({ success: true, id: result.insertId }));
    // }).catch(err => {
    //     res.send(JSON.stringify({ success: false, code: 10002, err }));
    // });
});


// 用户信息
router.post('/list', (req, res) => {
    console.log('list', req.session.user);

});

module.exports = router;