# 发布代码到npm库

## 账号
登陆[npm](http://npmjs.org/)注册账号，结束后**务必**进入邮箱进行验证账号；

## 代码库名称
命名之前，一定要在npm库搜索，是否被使用

## 创建项目

## 新建目录
```sh
mkdir captive-admin-ui
cd captive-admin-ui
```
配置package.json，不仅仅用来标明依赖和npm script脚本，也是npm包被外界识别的配置文件。
```sh
npm init
```
根据提示进行操作，即可
```json
{
    "name": "captive-admin-ui",
    "version": "1.0.1",
    "description": "基于element-ui库开发对后台UI库",
    "main": "index.js",
    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1"
    },
    "keywords": [
        "element-ui",
        "admin"
    ],
    "author": "captives",
    "license": "ISC",
    "dependencies": {
        "element-ui": "^2.15.1"
    }
}
```
## 本地测试
```sh
npm pack
```
会生成一个 tgz版本文件
打开一个新的项目，路径为刚刚生成的路径,即可安装使用
```sh
npm install ${path}/captive-admin-ui-1.0.0.tgz
```

## 登陆
在本地命令行下，登陆账号
```sh
 npm adduser 
```
按照提示，输入账户名，密码，以及账户的email邮箱地址；这时候看一下package.json中author尽量与npm账户一致。


检查是否登录成功
```sh
npm who am i
```
如果不成功则重新登录一下
```sh
npm login
```
## 提交发布
```sh
npm publish
```

## 测试提交
```sh
npm i captive-admin-ui --save
```

## 撤销当前提交
```bash
npm unpublish  --force //删除包
```

<hr/>
