<template>
  <el-main>
    控制台
    <CounterBar></CounterBar>
    <CounterBar1></CounterBar1>
    <CounterBar2></CounterBar2>
  </el-main>
</template>
<script>
import CounterBar from "./CounterBar.vue";
import CounterBar1 from "./CounterBar1.vue";
import CounterBar2 from "./CounterBar2.vue";

export default {
  name: "index",
  components: {
    CounterBar,
    CounterBar1,
    CounterBar2,
  },
};
</script>
<style lang="stylus" scoped></style>
