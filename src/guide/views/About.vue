<template>
  <el-container>
    <el-aside width="30%">
      <p>Youtube 视频下载</p>
      <el-row>
        <el-col :span="12">
          <el-link href="https://bitdownloader.net/">SaveFrom（MP4：1080P）</el-link>
        </el-col>
        <el-col :span="12">
          <el-link href="https://odownloader.com/">oDownloader（MP4:1080P WEBM:1080P）</el-link>
        </el-col>
        <el-col :span="12"></el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-link href="https://github.com/wangweianger/web-report-sdk">浏览器端页面性能监控平台</el-link>
        </el-col>
      </el-row>
    </el-aside>
    <el-main>
      <source-code v-model="list" :drawed="false"></source-code>
      <el-row v-for="item in list" :key="item.value">
        <vue-code v-if="item.code">
          <p>{{item.value}}</p>
          <pre :lang="item.lang">{{item.code}}</pre>
        </vue-code>
      </el-row>
    </el-main>
  </el-container>
</template>
<script>
export default {
  data() {
    return {
      list: [
        { value: 'components/SourceCode.vue', lang: "html" },
        { value: 'plugins/global.js', lang: "javascript" },
        { value: 'assets/css/code-style.css', lang: "css" },
      ]
    }
  }
}
</script>
<style lang="stylus" scoped>
.el-aside {
  background: orange;
}
</style>