const fs = require('fs');
const path = require('path');
const async = require("async");
const vueConfig = require('./../vue.config');
const DIR_ROOT = path.join(__dirname, '../');
const DIR_TEMP = __dirname; // process.env.TMPDIR;

// fs.copyFile(DIR_ROOT + "/vue.config.js", DIR_TEMP + "/vue.config.js", err => {
//     console.log('配置文件移动成功');
// });

const pages = Object.assign({}, vueConfig.pages);
const list = [];

for (let page in pages) {
    pages[page].name = page;
    list.push(createPage(page, pages[page]));
}

console.log('list', list.length);

fs.writeFile(DIR_ROOT + "/vue.config.js", "module.exports =" + JSON.stringify(list[0]), error => {
    console.log('文件写入成功');
});

function createPage(name, page) {
    let options = {
        pages: {},
        publicPath: "./" + name,
        css: {
            sourceMap: process.env.NODE_ENV !== 'production',
            loaderOptions: {
                css: {
                    // 这里的选项会传递给 css-loader
                },
                stylus: {
                    // 这里的选项会传递给 stylus-loader
                }
            }
        },
        productionSourceMap: process.env.NODE_ENV !== 'production',

    };
    options.pages[name] = page;
    let config = Object.assign(vueConfig, options);
    // delete config.pages;
    // config = Object.assign(config, page);
    return config;
}