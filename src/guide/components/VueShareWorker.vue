<template>
  <el-row v-if="!error" :gutter="20">
    <el-col :span="6"></el-col>
    <el-col :span="6">
      <el-button type="primary" @click="changeHandler(+1)">增加</el-button>
      <el-button type="primary" @click="changeHandler(-1)">减少</el-button>
    </el-col>
    <el-col :span="6"></el-col>
    <el-col :span="6">{{ value }}</el-col>
  </el-row>
</template>
<script>
// import { worker } from 'cluster'
export default {
  name: "VueShareWorker",
  data() {
    return {
      id: null,
      worker: null,
      value: "4334",
      error: null,
    };
  },
  mounted() {
    this.id = Date.now();
    if ("SharedWorker" in window) {
      this.worker = new SharedWorker("js/shareworker.js", "Vue-DEBUG::");
      this.worker.port.onmessage = this.onmessage.bind(this);
      this.worker.port.start();
      this.worker.port.postMessage({ id: this.id, value: 0 });
    } else {
      this.error = "当前浏览器不支持 SharedWorker";
    }
  },
  methods: {
    changeHandler(value) {
      this.worker.port.postMessage({ id: this.id, value: value });
    },
    onmessage(event) {
      console.log("VUE", event.data);
      this.value = event.data.value;
    },
  },
};
</script>
<style lang="stylus" scoped>
.el-row {
  margin: 20px 0;
}
</style>
