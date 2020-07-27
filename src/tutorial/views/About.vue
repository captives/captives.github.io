<template>
  <el-container>
    <el-main>
      <h1>This is an about page</h1>
      <div style="width: 50%; margin: 0 auto; height: 300px; overflow-y: auto; background: #EEE;">
        <FileUploader />
      </div>

      <VariableValueExchange></VariableValueExchange>
    </el-main>

    <el-footer>
      <a href="https://segmentfault.com/a/1190000005764629">JavaScript 类数组对象</a>

      <a href="https://segmentfault.com/a/1190000017790888">JS判断数组的六种方法详解</a>

      <a href="https://www.cnblogs.com/onepixel/articles/7674659.html">十大经典排序算法（动图演示）</a>
    </el-footer>
  </el-container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import FileUploader from './../components/FileUploader.vue';
import VariableValueExchange from './../components/VariableValueExchange.vue';
@Component({
  name: "About",
  components: { FileUploader, VariableValueExchange }
})
export default class About extends Vue {

}
</script>