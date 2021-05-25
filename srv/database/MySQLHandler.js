const mysql = require('mysql');
const config = require('../config/index').mysql;
//--------------------------------------------------------------------------------
// # docker 中下载 mysql
// docker pull mysql
// #启动
// docker run --name mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=123456 -d mysql

// #进入容器
// docker exec -it mysql bash

// #登录mysql
// mysql -u root -p
// ALTER USER 'root'@'localhost' IDENTIFIED BY '123456';

// #添加远程登录用户
// CREATE USER 'seven'@'%' IDENTIFIED WITH mysql_native_password BY 'seven9527';
// GRANT ALL PRIVILEGES ON *.* TO 'seven'@'%';


//--------------------------------------------------------------------------------
// var connection = mysql.createConnection(config);
// connection.connect(function (err) {
//     if (err) {
//         console.log('[mysql] - query:', err);
//         return;
//     }

//     console.log('[mysql] connect succeed!');
// });

// function saveBlog(title, text) {
//     const sql = "INSERT INTO blog(title, content) VALUES(?, ?)";
//     const params = [title, text];

//     console.log("sql", sql);
//     connection.query(sql, params, function (error, results, fields) {
//         if (error) throw error;
//         console.log('插入成功', results);
//     });
// }

// //关闭连接
// connection.end(function (err) {
//     if (err) {
//         return;
//     }

//     console.log('[mysql] cloesed succeed!');
// });

//--------------------------------------------------------------------------------
/**
 * 用连接池的方式
 * 多主机连接
 * mysql.createPoolCluster();
 */
class MySQLHandler {
    pool = null;
    constructor() {
        const options = { ...config, connectionLimit: 20, queueLimit: 10 };
        console.log('[mysql] create ....', options);
        const pool = mysql.createPool(options);
        //从连接池中获取连接触发
        pool.on('acquire', function (connection) {
            console.log('[mysql] 获取 %d 连接', connection.threadId, pool._allConnections.length);
        });

        pool.on('connection', function (connection) {
            console.log('[mysql] 建立新连接', connection.threadId, pool._allConnections.length);
        });

        pool.on('enqueue', function () {
            console.log('[mysql] 等待可用连接');
        });

        //连接池中有资源释放
        pool.on('release', function (connection) {
            console.log('[mysql] 释放连接 %d 回池中', connection.threadId);
        });

        this.pool = pool;
    }

    query = (sql, params) => {
        console.log("[mysql] query", sql, params);
        return new Promise((resolve, reject) => {
            //从连接池中取出可用连接
            this.pool.getConnection((err, connection) => {
                if (err) {
                    console.log('[mysql] - pool:', err);
                    reject(err);
                    return;
                }

                console.log("[mysql] 建立连接成功, 数量", this.pool._allConnections.length);
                const callback = (error, results, fields) => {
                    if (error) {
                        reject(error);
                    }

                    connection.release();//业务完成,释放资源到连接池
                    // connection.destroy() // 直接移除,不管队列中是否有任务
                    resolve(results);
                };

                if (params.length) {
                    connection.query(sql, params, callback);
                } else {
                    connection.query(sql, callback);
                }

                connection.on('error', function (err) {
                    console.log(err.code); // 'ER_BAD_DB_ERROR'
                    reject(err);
                });
            });
        })
    }

    close = () => {
        this.pool.end(err => {
            console.log('[mysql] 关闭连接池 异常', err);
        });
        console.log('[mysql] 关闭连接池');
    };
}


module.exports = MySQLHandler;