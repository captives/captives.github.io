//markdown 编辑器后端服务
const express = require('express');
const router = express.Router();
const store = require('./../database/SQLiteStore');
const { compile, renderFooter } = require('./../data/template/index');

//TODO session 存储用户信息
//TODO CRUD时，带上用户数据

/******************************************************************
 * 类别
 ******************************************************************/
router.post('/category', (req, res) => {
    store.getCategoryList((err, rows) => {
        res.send(JSON.stringify({ success: !err, data: rows }));
    });
});

router.post('/category_add', (req, res) => {
    if (req.body) {
        store.addCategory({
            id: req.body.id || null,
            name: req.body.name,
            enabled: !!req.body.enabled
        })
    }
    res.send(JSON.stringify({ success: true }));
});

router.post('/category_remove', (req, res) => {
    store.removeCategory(req.body.id, (err) => {
        res.send(JSON.stringify({ success: !err }));
    });
});



/******************************************************************
 * 文章
 ******************************************************************/
//写磁盘文件
function writeRowToFile(row) {
    return new Promise((resolve, reject) => {
        //解析数据
        const links = JSON.parse(row.links) || {};
        const styles = links.styles || [];
        const scripts = links.scripts || [];
        //渲染内容
        const doc = compile('article', { styles, scripts, title: row.title, content: row.html, version: Date.now() });
        //写HTML页面
        fs.outputFileSync(path.join(outputDir, "static/" + row.id + "_" + row.title + ".html"), doc, { encoding: 'utf-8' });

        //写md文档
        row.text += "\n" + renderFooter(styles, scripts);
        fs.outputFileSync(docDir + row.id + "_" + row.title + ".md", row.text);
        resolve();
    })
}

// 保存文章信息
router.post('/save', (req, res) => {
    store.save({
        ...req.body,
        links: JSON.stringify(req.body.links)
    }, (err, data) => {
        console.log('插入成功', data);
        store.getItemById(data.id).then(row => {
            writeRowToFile(row);
        }).catch(err => {
            console.log('查询失败', err);
        })
        res.send(JSON.stringify({ success: true, data }));
    });
});

// 获取文章列表
router.post('/list', (req, res) => {
    store.getList(req.body.page, req.body.size, data => {
        res.send(JSON.stringify({ success: true, data: data }));
    });
});

// 获取指定文章内容
router.post('/read', (req, res) => {
    if (req.body.id) {
        store.getItemById(req.body.id).then(row => {
            res.send(JSON.stringify({ success: true, data: row }));
        }).catch(err => {
            res.send(JSON.stringify({ success: false, data: null }));
        });
    } else {
        res.send(JSON.stringify({ success: false, message: "无效id" }));
    }
});

// 查询指定的文档，写入文件
router.post('/publish', (req, res) => {
    if (req.body.id) {
        store.getItemById(req.body.id).then(row => {
            writeRowToFile(row).then(() => {
                res.send(JSON.stringify({ success: true }));
            });
        }).catch(err => {
            res.send(JSON.stringify({ success: false, message: err }));
        })
    } else {
        res.send(JSON.stringify({ success: false, message: "无效id" }));
    }
});

// 获取指定文章内容
router.post('/delete', (req, res) => {
    if (req.body.id) {
        store.removeArticle(req.body.id, row => {
            console.log('--delete--', req.body.id, row);
            res.send(JSON.stringify({ success: true }));
        });
    } else {
        res.send(JSON.stringify({ success: false, message: "无效id" }));
    }
});

/******************************************************************
 * 文件
 ******************************************************************/
const fs = require('fs-extra');
const path = require('path');
const async = require("async");

const dir = process.cwd() + "/data";
const docDir = path.join(dir, '/files/');
const templateDir = path.join(dir, '/template/');
const outputDir = path.join(dir, '/dist/');

const { deleteFile } = require('./../utils/common');

/**
 *  读取目录，获取文件列表
 */
router.post('/async_file_list', (req, res) => {
    fs.readdir(docDir, function(err, files) {
        if (err) {
            res.send(JSON.stringify({ success: false, message: "扫描失败" + err }));
            return;
        }

        //批量识别文件信息
        async.mapLimit(files, 10, (name, callback) => {
            fs.stat(path.join(docDir, name), function(err, file) {
                let result = {
                    name,
                    fid: null, //对应数据的文件id
                    size: file.size,
                    uid: file.uid, //拥有该文件的用户的数字型用户标识符。
                    time: file.birthtime, //创建时间
                    mtime: file.mtime, //上次修改时间戳
                    atime: file.atime, //上次访问时间戳
                };

                if (name.includes('_')) {
                    const temp = name.split('_');
                    result.fid = temp[0];
                    result.name = temp[1];
                }
                callback(null, result);
            });
        }, (err, data) => {
            if (err) {
                res.send(JSON.stringify({ success: false, message: "扫描失败" + err }));
            } else {
                res.send(JSON.stringify({ success: true, message: "扫描完成", data }));
            }
        })
    });
});

/**
 * 读取文件内容
 */
router.post('/async_read_file', (req, res) => {
    if (!!req.body.fid && !!req.body.name) {
        fs.readFile(docDir + req.body.fid + "_" + req.body.name, "utf-8", (err, data) => {
            if (err) {
                res.send(JSON.stringify({ success: false, message: "文件未找到" + err }));
            } else {
                res.send(JSON.stringify({ success: true, message: "读取成功", data }));
            }
        });
    } else {
        res.send(JSON.stringify({ success: false, message: "参数缺失" + err }));
    }
});

/**
 * 删除文件
 */
router.post('/async_delete_file', (req, res) => {
    if (!!req.body.fid && !!req.body.name) {
        fs.unlink(docDir + req.body.fid + "_" + req.body.name, (err, data) => {
            if (err) {
                res.send(JSON.stringify({ success: false, message: "文件未找到" + err }));
            } else {
                res.send(JSON.stringify({ success: true, message: "读取成功", data }));
            }
        });
    } else {
        res.send(JSON.stringify({ success: false, message: "参数缺失" + err }));
    }
});

/**
 * 部署静态md文件
 */
router.post('/async_to_file', (req, res) => {
    //1、拷贝静态资源到dist目录
    //2、递归分页查询列表内的所有信息
    //3、序列化写文件

    //查询出文章数据库内容，备份为单个文档
    store.getAllList().then(rows => {
        async.eachLimit(rows, 5, (row, callback) => {
            const links = JSON.parse(row.links) || {};
            const styles = links.styles || [];
            const scripts = links.scripts || [];
            //写md文档
            row.text += "\n" + renderFooter(styles, scripts);
            fs.outputFile(docDir + row.id + "_" + row.title + ".md", row.text, callback);
        }, err => {
            if (err) {
                res.send(JSON.stringify({ success: false, message: "备份失败" + err }));
            } else {
                res.send(JSON.stringify({ success: true, message: "备份完成" }));
            }
        });
    }).catch(err => {
        res.send(JSON.stringify({ success: false, message: "数据库读取失败" + err }));
    });
});

/**
 * 部署静态html文件
 */
router.post('/async_build', (req, res) => {
    //1、查询出文章数据库内容
    store.getAllList().then(rows => {
        //2、准备目录
        fs.emptyDirSync(outputDir);
        fs.copySync(templateDir, outputDir);
        // 3、队列任务渲染html
        async.eachOfLimit(rows, 5, (row, index, callback) => {
            console.log(((index + 1) / rows.length * 100).toFixed(2) + '%', index, row.title);
            const links = JSON.parse(row.links) || {};
            const styles = links.styles || [];
            const scripts = links.scripts || [];
            const doc = compile('article', {
                styles,
                scripts,
                title: row.title,
                content: row.html,
                version: Date.now(),
                prev: rows[index - 1] ? { href: '/static/' + rows[index - 1].id + "_" + rows[index - 1].title + ".html", title: rows[index - 1].title } : null,
                next: rows[index + 1] ? { href: '/static/' + rows[index + 1].id + "_" + rows[index + 1].title + ".html", title: rows[index + 1].title } : null,
            });

            //4、写HTML页面
            fs.outputFile(path.join(outputDir, "static/" + row.id + "_" + row.title + ".html"), doc, { encoding: 'utf-8' }, callback);
        }, err => {
            if (err) {
                res.send(JSON.stringify({ success: false, message: "部署失败" + err }));
            } else {
                res.send(JSON.stringify({ success: true, message: "部署完成" }));
            }

            //5、 移除临时模版文件
            deleteFile(outputDir, ['.js', '.tpl']);

            //6、创建列表文件
            const list = rows.map((row, index) => {
                return {
                    id: row.id,
                    title: row.title,
                    desc: row.desc,
                    create_time: row.create_time,
                    update_time: row.update_time,
                    href: '/static/' + row.id + "_" + row.title + ".html",
                }
            });

            list.reverse();
            const html = compile('list', { title: "文章列表自动生成", list, version: Date.now() });
            //7、写列表文件
            fs.outputFileSync(path.join(outputDir, "/article.html"), html, { encoding: 'utf-8' });
            //8、同步到github目录
            const targetDir = "/Volumes/DATA/github/captives.github.io";
            fs.copySync(outputDir, targetDir);
        });
    }).catch(err => {
        console.log(err);
        res.send(JSON.stringify({ success: false, message: err }));
    })
});

module.exports = router;