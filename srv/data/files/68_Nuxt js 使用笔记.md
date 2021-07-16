# Nuxt

## 配置相关

### 引入第三方库
`include`方式会把第三方库打包到项目中，`import`方式则不会；需要CDN方式引入

#### include方式
在`plugins`目录下新建 `element-ui.js`
```js
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI, { size: "small" });
```

在`nuxt.config.js`的`plugins`项下添加`element-ui.js`

```js
plugins: [
       '~/plugins/element-ui.js',
],
```
#### import方式
在`nuxt.config.js`的`build`项下引入`element-ui`
```js
head: {
    link: [
        { rel: 'stylesheet', href: 'https://unpkg.com/element-ui/lib/theme-chalk/index.css' },
    ],
    script: [
        { type: 'text/javascript', src: 'https://unpkg.com/element-ui/lib/index.js' }
    ],
},
build: {
    babel: {
        plugins: [
            ['import', {
                libraryName: 'element-ui',
                libraryDirectory: 'lib',
                camel2DashComponentName: false
            }]
        ]
    },
    vendor: [
        '~/plugins/element-ui.js'
    ],
}
```

### 打包删除console
安装`babel-plugin-transform-remove-console`
```sh
npm i babel-plugin-transform-remove-console -D
```
在`nuxt.config.js`中配置
```js
const plugins = [];
//生产环境保留error和warn
if (process.env.NODE_MODE === 'production') {
    plugins.push(["transform-remove-console", { "exclude": ["error", "warn"] }]);
}

module.exports = {
    build: {
        babel: { plugins },
    }
}



<hr/>
