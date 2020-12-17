<template>
  <body>
    <el-container>
      <el-header>Header</el-header>
      <router-view></router-view>
    </el-container>
  </body>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
@Component({ name: "Main" })
export default class Main extends Vue {}
</script>
<style lang="stylus" scoped>
.el-container {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  .el-header{
    background:#409EFF;
  }
}
</style>
