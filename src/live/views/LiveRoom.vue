<template>
  <el-container>直播会议室</el-container>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({
  name: "LiveRoom",
})
export default class LiveRoom extends Vue {}
</script>
<style lang="stylus" scoped>
.el-container {
  background-image: radial-gradient(#ffffff, #eef7f6);
}
</style>
