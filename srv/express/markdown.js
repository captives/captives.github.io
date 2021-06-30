//markdown 编辑器后端服务
const express = require('express');
const router = express.Router();
const store = require('./../database/SQLiteStore');

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
function writeRowToFile(row, callback) {

    //1、准备目录
    copyDirectory(templateDir, outputDir);
    //2、识别模板
    fs.readFile(outputDir + "index.html", "utf-8", (err, html) => {
        if (err) {
            res.send(JSON.stringify({ success: false, message: "备份失败" + err }));
            return;
        }

        const links = JSON.parse(row.links) || {};
        const styles = links.styles || [];
        const scripts = links.scripts || [];
        const doc = html.interpolate({ title: row.title, body: row.html, styles, scripts });
        // 4、定义写文件任务
        writeFile(path.join(outputDir, "static/"), row.id + "_" + row.title + ".html", doc, () => {
            console.log('html文件 更新成功');
        });

        if (styles.length) {
            row.text += "\n\n---\n- style \n- " + styles.join('\n- ');
        }

        if (scripts.length) {
            row.text += "\n\n---\n- script \n- " + scripts.join('\n- ');
        }

        //5、写md文档
        fs.writeFile(docDir + row.id + "_" + row.title + ".md", row.text, (err) => {
            callback && callback(err);
        });
    });
}

// 保存文章信息
router.post('/save', (req, res) => {
    store.save({
        ...req.body,
        links: JSON.stringify(req.body.links)
    }, (err, data) => {
        console.log('插入成功', data);
        store.getItemById(data.id, (err, row) => {
            writeRowToFile(row);
        });
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
        store.getItemById(req.body.id, (err, row) => {
            res.send(JSON.stringify({ success: !err, data: row }));
        });
    } else {
        res.send(JSON.stringify({ success: false, message: "无效id" }));
    }
});

// 查询指定的文档，写入文件
router.post('/publish', (req, res) => {
    if (req.body.id) {
        store.getItemById(req.body.id, (err, row) => {
            if (!err) {
                res.send(JSON.stringify({ success: !err }));
                return;
            }

            store.getItemById(data.id, (err, row) => {
                if (!err) {
                    res.send(JSON.stringify({ success: !err }));
                    return;
                }

                writeRowToFile(row, (err) => {
                    res.send(JSON.stringify({ success: !err }));
                });
            });
        });
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
const fs = require('fs');
const path = require('path');
const async = require("async");

const dir = process.cwd() + "/data";
const docDir = path.join(dir, '/files/');
const templateDir = path.join(dir, '/template/');
const outputDir = path.join(dir, '/dist/');

/**
 *  读取目录，获取文件列表
 */
router.post('/async_file_list', (req, res) => {
    fs.readdir(docDir, function(err, files) {
        if (err) {
            res.send(JSON.stringify({ success: false, message: "扫描失败" + err }));
            return;
        }

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
 * 数据库内容写文件到磁盘
 */
router.post('/async_to_file', (req, res) => {
    //查询出文章数据库内容，备份为单个文档
    store.getAllList((err, rows) => {
        if (err) {
            res.send(JSON.stringify({ success: false, message: "备份准备失败" + err }));
            return;
        }

        const list = rows || [];
        async.eachLimit(list, 5, (item, callback) => {
            const links = JSON.parse(item.links) || {};
            const styles = links.styles || [];
            const scripts = links.scripts || [];
            if (styles.length) {
                item.text += "\n\n---\n- style \n- " + styles.join('\n- ');
            }

            if (scripts.length) {
                item.text += "\n\n---\n- script \n- " + scripts.join('\n- ');
            }

            fs.writeFile(docDir + item.id + "_" + item.title + ".md", item.text, callback);
        }, err => {
            if (err) {
                res.send(JSON.stringify({ success: false, message: "备份失败" + err }));
            } else {
                res.send(JSON.stringify({ success: true, message: "备份完成" }));
            }
        });
    })
});

const { copyDirectory, writeFile } = require('./../utils/common');

/**
 * 模板字符串渲染页面数据
 * @param {*} params 插值参数
 * @returns 渲染后的html 
 */
String.prototype.interpolate = function(params) {
    const style = '\<link rel="stylesheet" href="${value}"\>';
    const script = "\<script type='text/javascript' src='${value}'\> \</script\>";

    if (!!params.styles) {
        params.style = params.styles.map(value => style.interpolate({ value })).join("\n");
        delete params.styles;
    } else {
        params.style = "";
    }

    if (!!params.scripts) {
        params.script = params.scripts.map(value => script.interpolate({ value })).join("\n");
        delete params.scripts;
    } else {
        params.script = "";
    }

    const keys = Object.keys(params);
    const values = Object.values(params);
    return new Function(...keys, `return \`${this}\`;`)(...values);
}

/**
 * 部署静态文件
 */
router.post('/async_build', (req, res) => {
    //1、准备目录
    copyDirectory(templateDir, outputDir);
    //2、识别模板
    fs.readFile(outputDir + "index.html", "utf-8", (err, html) => {
        if (err) {
            res.send(JSON.stringify({ success: false, message: "备份失败" + err }));
            return;
        }

        //3、查询出文章数据库内容
        store.getAllList((err, rows) => {
            if (err) {
                res.send(JSON.stringify({ success: false, message: "备份准备失败" + err }));
                return;
            }

            // 4、执行任务
            async.eachLimit(rows, 5, (item, callback) => {
                const links = JSON.parse(item.links) || {};
                const doc = html.interpolate({
                    title: item.title,
                    body: item.html,
                    styles: links.styles || [],
                    scripts: links.scripts || []
                });

                // 5、定义写文件任务
                writeFile(path.join(outputDir, "static/"), item.id + "_" + item.title + ".html", doc, callback);
            }, err => {
                if (err) {
                    res.send(JSON.stringify({ success: false, message: "部署失败" + err }));
                } else {
                    res.send(JSON.stringify({ success: true, message: "部署完成" }));
                }

                //6、移除临时模版文件
                fs.unlinkSync(outputDir + "index.html");

                //7、创建列表文件
                const list = rows.map(row => `<li><a href="/static/${row.id + '_' + row.title}.html" target="blank">${row.title}</a><i>${row.update_time}</i></li>`);
                const page = html.interpolate({
                    title: "文章列表",
                    body: "<ul class='article-list'>" + list.join(" ") + "</ul>",
                });

                // 8、写列表文件
                writeFile(outputDir, "article.html", page, err => {
                    console.log(err ? "部署失败：" + err : '部署完成');
                    const targetDir = "/Volumes/DATA/github/captives.github.io";
                    //9、 同步到github目录
                    copyDirectory(outputDir, targetDir);
                });
            });
        });
    });

});

module.exports = router;