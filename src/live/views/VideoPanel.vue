<template>
  <div class="video-item">
    <div class="video-tool-bar">下台</div>
    <slot></slot>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
@Component({
  name: "VideoPanel",
})
export default class VideoPanel extends Vue {
  @Prop({ type: MediaStream, default: null }) readonly stream?: MediaStream;
}
</script>
<style lang="stylus" scoped>
.video-item {
  position: relative;
  width: 320px;
  height: 240px;
  background: #999;
  margin: 0;
  display: inline-block;

  .video-tool-bar {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
</style>
