<template>
  <el-container>公共会议室</el-container>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({
  name: "PublicRoom",
})
export default class PublicRoom extends Vue {}
</script>
<style lang="stylus" scoped>
.el-container {
  background-image: radial-gradient(#ffffff, #fdedcc);
}
</style>
