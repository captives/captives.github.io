<template>
  <el-main>
    <h1>Docker安装mysql</h1>
    <h3>建立镜像</h3>
    <p>1、拉取官方镜像</p>
    <vue-code>
      <pre lang="bash">docker pull mysql:5.7   # 拉取 mysql 5.7 </pre>
      <pre lang="bash">docker pull mysql       # 拉取最新版mysql镜像  </pre>
    </vue-code>

    <p>2、检查是否拉取成功</p>
    <vue-code>
        <pre lang='bash'>sudo docker images</pre>
    </vue-code>
    <p>3、一般来说数据库容器不需要建立目录映射</p>
    <vue-code>
        <pre lang='bash'>sudo docker run -p 3306:3306 --name mysql -e MYSQL_ROOT_PASSWORD=123456 -d mysql</pre>
    </vue-code>
    <ul>
        <li>–name：容器名，此处命名为<em>mysql</em></li>
        <li>-e：配置信息，此处配置root用户的登陆密码</li>
        <li>-p：端口映射，此处映射主机3306端口到容器的3306端口</li>
    </ul>

    <p>4、检查容器是否正确运行</p>
    <vue-code>
        <pre lang='bash'>docker ps -a               #所有的列表</pre>
        <pre lang='bash'>docker container ls        # 正在运行的列表</pre>
    </vue-code>
  </el-main>
</template>