<template>
  <el-container>私密会议室</el-container>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component({
  name: "PrivateRoom"
})
export default class PrivateRoom extends Vue {

}
</script>
<style lang="stylus" scoped>
.el-container {
  background-image: radial-gradient(#ffffff, #d8f7f9);
}
</style>