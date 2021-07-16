const path = require('path');
const fs = require('fs-extra');
const handlebars = require('handlebars');

//组件
const components = {
    header: {
        path: "./header.tpl"
    },
    menu: {
        path: "./menu.tpl"
    },
};

//页面
const pages = {
    //首页
    index: {
        path: "./index.tpl",
        include: ['menu', 'header']
    },
    //收藏夹
    favorite: {
        path: "./favorite.tpl",
        include: ['menu', 'header']
    },
    //文章列表
    list: {
        path: './list.tpl',
        include: ['menu', 'header']
    },
    //文档
    article: {
        path: './article.tpl',
        include: ['menu', 'header']
    },
    //联系
    contact: {
        path: './contact.tpl',
        include: ['menu', 'header']
    }
};

for (let key in components) {
    //读取模版
    const html = fs.readFileSync(path.join(__dirname, components[key].path), { flag: 'r', encoding: 'utf-8' });
    //存储模版
    components[key].template = html;
}

/**
 * 部署页面
 * @param {*} tpl  模版名称
 * @param {*} data  模板数据
 */
function compile(tpl, data = {}) {

    data.content ? new handlebars.SafeString(data.content) : "";
    //读取模版
    const temp = fs.readFileSync(path.join(__dirname, pages[tpl].path), { flag: 'r', encoding: 'utf-8' });
    //拼接模版组件
    pages[tpl].include.forEach(item => {
        data[item] = components[item].template;
    });
    //渲染组件
    const render = handlebars.compile(temp);
    //编译主页模版
    const template = handlebars.compile(render(data));

    //渲染页面数据
    const html = template(data);
    return html;
}


function renderFooter(styles, scripts) {
    var source = `<hr/>
{{#each styles}}
<link rel="stylesheet" href="{{ this }}"> 
{{/each}}
{{#each scripts}}
<script type="text/javascript" src="{{ this }}"></script>
{{/each}}`;
    var template = handlebars.compile(source);
    return template({ styles, scripts });
}


module.exports = { compile, renderFooter };