## 安装
命令行下载
```sh
wget https://nodejs.org/dist/.../node-v4.2.1-linux-x64.tar.gz
```
解压缩文件


```sh
tar –zxvf node-v4.2.1-linux-x64.tar.gz
```

移动副本目录到 /opt/下
```sh
sudo cp -r node-v4.2.1-linux-x64/ /opt/
```
设置全局软连接
```sh
sudo ln -s /opt/node-v4.2.1-linux-x64/bin/node /usr/local/bin/node
sudo ln -s /opt/node-v4.2.1-linux-x64/bin/npm /usr/local/bin/npm
```

查看安装版本号
```sh
node -v
npm -v
npm install 镜像仓库
```
查看镜像仓库

```sh
npm config get registry  #https://registry.npmjs.org/
如果使用npm安装一些包失败，可使用以下三种办法任意一种都能解决问题
```

## 配置
通过 config命令

```sh
npm config set registry https://registry.npm.taobao.org
npm info underscore #查看underscore模块信息
```

命令行指定

```sh
npm --registry https://registry.npm.taobao.org 
```


编辑`~/.npmrc`加入以下内容
windows路径在 `{npm_install_dir}/node_modules/npm/npmrc`
```sh
registry = https://registry.npm.taobao.org
```

## 调试

启动
```sh
node –inspect index.js
```
一共有两种打开调试工具的方法，第一种是在*Chrome*浏览器的地址栏，键入`chrome://inspect`或者 `about:inspect`进入, 在*Devices/Target*部分，点击*inspect*链接，就能进入调试工具了。

---
- script 
- //cn.vuejs.org/js/vue.min.js