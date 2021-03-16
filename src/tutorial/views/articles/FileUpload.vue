<template>
  <el-container>
    <el-main class="center">
      <h1>This is an about page</h1>
      <div class="file-top">
        <FileUploader />
      </div>
      <ResultInput></ResultInput>
      <VariableValueExchange style="display: none"></VariableValueExchange>
    </el-main>
    <el-footer style="display: none">
      <a href="https://segmentfault.com/a/1190000005764629">JavaScript 类数组对象</a><br />

      <a href="https://segmentfault.com/a/1190000017790888">JS判断数组的六种方法详解</a><br />

      <a href="https://www.cnblogs.com/onepixel/articles/7674659.html">十大经典排序算法（动图演示）</a><br />
    </el-footer>
  </el-container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import FileUploader from "./../../components/FileUploader.vue";
import ResultInput from "./../../components/ResultInput.vue";
import VariableValueExchange from "./../../components/VariableValueExchange.vue";
@Component({
  name: "About",
  components: { FileUploader, VariableValueExchange, ResultInput },
})
export default class About extends Vue { }
</script>

<style lang="stylus" scoped>
.file-top {
  width: 80%;
  margin: 0 auto;
  height: 300px;
  overflow-y: auto;
  background: #eee;
}
</style>
