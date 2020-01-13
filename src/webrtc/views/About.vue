<template>
  <el-container>
    <el-aside width="30%">
      <p>Youtube 视频下载</p>
      <el-link href="https://bitdownloader.net/">SaveFrom（MP4：1080P）</el-link>
      <el-link href="https://odownloader.com/">oDownloader（MP4:1080P WEBM:1080P）</el-link>
    </el-aside>
    <el-main>
      <source-code v-model="list"></source-code>

      <el-row v-for="item in list" :key="item.value">
        <el-code v-if="item.code">
          <p>{{item.value}}</p>
          <pre :lang="item.lang">{{item.code}}</pre>
        </el-code>
      </el-row>

      <el-source value="src/plugins/global.js" lang="javascript"></el-source>
    </el-main>
  </el-container>
</template>
<script>
export default {
  data() {
    return {
      list: [
        { value: 'src/components/SourceCode.vue', lang: "html" },
        { value: 'src/plugins/global.js', lang: "javascript" },
        { value: 'src/assets/css/code-style.css', lang: "css" },
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