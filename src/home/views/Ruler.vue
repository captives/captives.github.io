<template>
  <el-main>
    <Ruler></Ruler>
  </el-main>
</template>
<script>
import Ruler from './ruler/Ruler';
export default {
  name: "RulerMain",
  components: {
    Ruler
  }
}
</script>
<style lang="stylus" scoped>
.el-main {
  height: 600px;
  width: 100%;
}
</style>