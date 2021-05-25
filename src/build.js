const os = require("os");
const fs = require("fs");
const process = require("child_process");
const GITHOME = "/Volumes/DATA/github/";
const buildDir = "captives.github.io";

let buildPath = null;
if (os.type().indexOf("Window") != -1) {
    buildPath = "E:\\github\\" + buildDir;
} else {
    buildPath = GITHOME + buildDir;
}

console.log("build output dirctory", os.type(), buildPath);

const dirPath = "./";
const exclude = [
    ".git",
    ".gitignore",
    ".DS_Store",
    "public",
    "node_modules",
    "package-lock.json",
    buildDir,
];

const srvExclude = [
    ".git",
    ".gitignore",
    ".DS_Store",
    "node_modules",
    "dist",
    "config",
    "chrome",
    "ssl",
    "package-lock.json",
    "articles.db",
];


let files = fs.readdirSync(dirPath);
files = files.filter((filename) => exclude.indexOf(filename) == -1);

function removeDir(file) {
    if (fs.existsSync(file)) {
        if (fs.statSync(file).isDirectory()) {
            //如果是一个文件夹
            let arr = [];
            arr = fs.readdirSync(file);
            arr.forEach((item, index) => {
                //递归
                removeDir(file + "/" + item);
            });
            fs.rmdirSync(file);
        } else {
            //如果是一个文件
            fs.unlinkSync(file);
        }
    } else {
        console.log("文件不存在！");
    }
}

function copyFolder(from, to, exclude) {
    exclude = exclude || [];
    // 复制文件夹到指定目录
    let files = [];
    if (fs.existsSync(to)) {
        // 文件是否存在 如果不存在则创建
        files = fs.readdirSync(from);
        files.forEach(function(file, index) {
            if (file.indexOf("node_modules") != -1) {
                console.log(exclude, file);
            }
            if (exclude.includes(file)) {
                return;
            }

            var targetPath = from + "/" + file;
            var toPath = to + "/" + file;
            if (fs.statSync(targetPath).isDirectory()) {
                // 复制文件夹
                copyFolder(targetPath, toPath, exclude);
            } else {
                // 拷贝文件
                fs.copyFileSync(targetPath, toPath);
            }
        });
    } else {
        fs.mkdirSync(to);
        copyFolder(from, to, exclude);
    }
}

console.log(files);
process.exec("npm run build", (error, stdout, stderr) => {
    if (error) {
        console.log("error:" + error);
    } else {
        console.log("stdout:" + stdout);
    }

    if (stderr) {
        console.log("stderr:" + stderr);
    }

    copyFolder("src", buildDir + "/src");
    copyFolder(GITHOME + "/source-server", buildDir + "/srv", srvExclude);

    copyFolder(buildPath + "/.git", buildDir + "/.git");

    files.forEach((item) => {
        if (item != "src") {
            if (fs.statSync(item).isDirectory()) {
                copyFolder(item, buildDir + "/src");
            } else {
                // 拷贝文件
                fs.copyFileSync(item, buildDir + "/src/" + item);
            }
        }
    });

    removeDir(buildPath);
    copyFolder(buildDir, buildPath);
});

// files = files.map(item => dirPath + '/' + item);

// for(let i = 0, len = files.length; i < len; i++) {
//     fs.unlinkSync(files[i]);
// };