const fs = require('fs');
const path = require('path');

function copyDirectory(src, dest) {
    if (fs.existsSync(dest) == false) {
        fs.mkdirSync(dest);
    }

    if (fs.existsSync(src) == false) {
        return false;
    }

    console.log("src:" + src + ", dest:" + dest);
    // 拷贝新的内容进去
    var dirs = fs.readdirSync(src);
    dirs.forEach(function(item) {
        var item_path = path.join(src, item);
        var temp = fs.statSync(item_path);
        if (temp.isFile()) { // 是文件
            // console.log("Item Is File:" + item);
            fs.copyFileSync(item_path, path.join(dest, item));
        } else if (temp.isDirectory()) { // 是目录
            // console.log("Item Is Directory:" + item);
            copyDirectory(item_path, path.join(dest, item));
        }
    });
}

function writeFile(src, name, data, callback) {
    console.log(1, src, fs.existsSync(src));
    if (fs.existsSync(src) == false) {
        fs.mkdirSync(src);
    }

    if (fs.existsSync(src) == false) {
        return false;
    }

    console.log(2, src, fs.existsSync(src));
    fs.writeFile(src + name, data, callback);
}


/**
 * 删除指定文件，或者删除指定后缀名的文件
 * @param {*} src 
 * @param {*} name 文件名，或者后缀名集合
 */
function deleteFile(src, args) {
    if (fs.existsSync(src) == false) {
        return;
    }

    var dirs = fs.readdirSync(src);
    if (typeof args == 'string') {
        if (dirs.includes(args) && args.indexOf('.') != -1) {
            fs.unlinkSync(path.join(src, args));
        }
    } else if (args instanceof Array) {
        const reg = new RegExp("^.*?(" + args.join('|') + ")$");
        dirs.forEach(item => {
            if (reg.test(item)) {
                fs.unlinkSync(path.join(src, item));
            }
        });
    }
}

module.exports = { copyDirectory, writeFile, deleteFile };