const sqlite3 = require('sqlite3').verbose();

/**
 * 文章数据库；
 * 内存数据库:memory:，数据不会持久化
 * https://www.runoob.com/sqlite/sqlite-create-table.html
 * 
 * 常用约束如下：
    NOT NULL - 非空
    UNIQUE - 唯一
    PRIMARY KEY - 主键
    FOREIGN KEY - 外键
    CHECK - 条件检查
    DEFAULT - 默认
 * 指定表上增加字段
 * ALTER TABLE "article"  ADD COLUMN "category_id" INT DEFAULT(0)
 */
const db = new sqlite3.Database('data/articles.db', error => {
    if (error) {
        console.log("SQLite 打开失败", error);
    } else {
        console.log('SQLite 数据库创建/读取成功');
    }
});

//内部的查询将并行执行
db.parallelize(() => { console.log('db serialize'); });

//内部的查询将顺序执行
db.serialize(() => {
    //用户表
    db.run(`CREATE Table IF NOT EXISTS user (
            id              INTEGER     PRIMARY KEY AUTOINCREMENT,              -- 账户id
            enabled         INTEGER     default 0,                              -- 默认禁用
            create_time     INTEGER     default (datetime('now', 'localtime')),   -- 创建日期
            name            TEXT        NOT NULL,                               -- 昵称
            birthday        INTEGER                                            -- 生日
    )`);

    // 文章类别表
    db.run(`CREATE Table IF NOT EXISTS category (
        id              INTEGER     PRIMARY KEY AUTOINCREMENT,              -- 账户id
        enabled         INTEGER     default 0,                              -- 默认禁用
        create_time     INTEGER     default (datetime('now', 'localtime')),   -- 创建日期
        name            TEXT        NOT NULL                                  -- 类别名称
    )`);

    //创建唯一索引，防止列别名重复创建
    // db.run(`DROP INDEX index_category_name`);
    // db.run(`CREATE UNIQUE INDEX index_category_name ON category (name)`);

    //文章表
    db.run(`CREATE Table IF NOT EXISTS article (
            id              INTEGER     PRIMARY KEY AUTOINCREMENT,
            create_time     INTEGER     default (datetime('now', 'localtime')),
            update_time     INTEGER     default (datetime('now', 'localtime')),
            title           CHAR(50)    NOT NULL,                              -- 标题
            text            TEXT,                                              -- markdown
            html            TEXT,                                              -- html
            desc            TEXT,                                              -- 描述
            links           TEXT,                                             -- style/script
            uid             INTEGER                                            -- 用户id
            category_id     INTEGER                                            -- 类别id
    )`);
});

const save = (data, callback) => {
    console.log('保存文章', data.id, data.title, data.links);
    if (data.id) {
        db.run("UPDATE article SET title = ?, text = ?,html = ?, desc = ?, links = ?, update_time = datetime('now', 'localtime')  WHERE id = ?", [data.title, data.text, data.html, data.desc, data.links, data.id], (err) => {
            callback(err, { id: data.id });
        });
    } else {
        db.run("INSERT INTO article (title, text, html, desc, links) VALUES (?, ?, ?, ?, ?)", [data.title, data.text, data.html, data.desc, data.links]);
        db.get("select last_insert_rowid() as id from article", callback);
    }
}

//获取文章列表
const getList = (page, size, callback) => {
    page = page || 1;
    size = size || 10;
    let data = {
        list: [],
        total: 0
    };
    db.serialize(() => {
        //总条数
        db.get("SELECT count(*) as total FROM article", (err, row) => {
            if (!err) {
                data.total = row.total;
            }
        });

        //offset代表从第几条记录“之后“开始查询，limit表明查询多少条结果
        db.all("SELECT id, title, category_id, create_time, update_time FROM article order by id limit ? offset ?;", [size, (page - 1) * size], (err, row) => {
            if (callback) {
                data.list = row;
                callback(data);
            } else {
                return new Promise(Promise.resolve(row), Promise.reject(err));
            }
        });
    })
}

//获取指定文章的详细信息
const getItemById = (id) => {
    //方式一
    // const stmt = db.prepare("SELECT * FROM article WHERE id = ?", (err, row) => {
    //     callback && callback(row);
    // });

    // if (id instanceof Array) {
    //     id.forEach(val => stmt.run(val));
    // } else if (id instanceof Number || id instanceof String) {
    //     stmt.run(id);
    // }

    // stmt.finalize();
    // 方式二
    return new Promise((resolve, reject) => {
        db.get("SELECT *, create_time as createTime, update_time as updateTime FROM article WHERE id = ?", id, (err, data) => {
            if (err) {
                reject(err);
            } else
                resolve(data);
        })
    });
}

// 获取类别列表
const getCategoryList = (callback) => {
    db.all("SELECT * FROM category", callback);
}

//增加类别
const addCategory = (data) => {
    if (data.id) {
        db.run("UPDATE category SET name = ?, enabled = ? WHERE id = ?", data.name, data.enabled, data.id);
    } else {
        console.log('新增类别', data);
        db.run("INSERT OR IGNORE INTO category (name, enabled) VALUES (?, ?)", data.name, data.enabled ? 1 : 0);
    }
}

const removeCategory = (id, callback) => {
    if (id) {
        db.run("DELETE FROM category WHERE id = $id", { $id: id }, callback);
    } else {
        callback("无效id");
    }
}

//获取所有文章
const getAllList = () => {
    return new Promise((resolve, reject) => {
        db.all("SELECT * FROM article", (err, data) => {
            if (err) {
                reject(err);
            }
            resolve(data);
        });
    })
}

/**
 * 移除文章
 * @param {*} id 
 * @param {*} callback 
 */
const removeArticle = (id, callback) => {
    db.run("DELETE FROM article WHERE id = $id", { $id: id }, callback);
}

module.exports = {
    getCategoryList,
    addCategory,
    removeCategory,
    save,
    getList,
    getItemById,
    getAllList,
    removeArticle
};