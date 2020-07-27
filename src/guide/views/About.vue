<template>
  <el-container>
    <el-aside width="20%">
      <p>Youtube 视频下载</p>
      <ul>
        <li>
          <el-link href="https://bitdownloader.net/">SaveFrom（MP4：1080P）</el-link>
        </li>
        <li>
          <el-link href="https://odownloader.com/">oDownloader（MP4:1080P WEBM:1080P）</el-link>
        </li>
        <li>
          <el-link href="https://github.com/wangweianger/web-report-sdk">浏览器端页面性能监控平台</el-link>
        </li>
      </ul>

      <el-row>
        <!-- 源码组件的演示 -->
        <source-code v-model="list" :drawed="false"></source-code>
        <el-row v-for="item in list" :key="item.value">
          <vue-code v-if="item.code">
            <p>{{item.value}}</p>
            <pre :lang="item.lang">{{item.code}}</pre>
          </vue-code>
        </el-row>
      </el-row>

      <el-row class="nav">
        <!-- <el-tree :data="routes" :props="{ label: 'name'}" @node-click="handleNodeClick">
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <router-link :to="data.path">{{data.name}}</router-link>
          </span>
        </el-tree> -->
      </el-row>
    </el-aside>
    <el-main>
      <h3>站点导航</h3>
      <el-tree :data="routes" :props="{ label: 'name'}" @node-click="handleNodeClick"></el-tree>
    </el-main>
  </el-container>
</template>
<script>
import { routes } from './../router/index';
export default {
  name:"About",
  data() {
    return {
      routes,
      list: [
        { value: 'components/SourceCode.vue', lang: "html" },
        { value: 'plugins/global.js', lang: "javascript" },
        { value: 'assets/css/code-style.css', lang: "css" },
      ]
    }
  },
  methods: {
    handleNodeClick() {

    }
  }
}
</script>
<style lang="stylus" scoped>
.el-aside {
  border-right: 1px solid rgb(84, 92, 100);
}

ul {
  list-style: none;

  li {
    margin: 10px 0;
    padding: 5px;
  }
}

.el-row.nav {
  padding-left: 50px;
}
</style>