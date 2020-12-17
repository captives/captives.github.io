<template>
  <el-container>
    <h1>Vuex: vuex-module-decorators</h1>
  </el-container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
@Component({
  name: "About",
})
export default class About extends Vue {}
</script>
<style lang="stylus" scoped>
.el-main {
  width: 70%;
  margin: 0 auto;
}
</style>
