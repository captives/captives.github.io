<template>
  <div class="videos">
    <VideoItem
      v-for="(item, index) in list"
      :key="index"
      :index="index + 1"
      :data="item"
      :style="{left:item.x+'px', top:item.y + 'px'}"
    ></VideoItem>
  </div>
</template>
<script>

import VideoItem from './VideoItem';
export default {
  name: "VideoList",
  components: {
    VideoItem
  },

  props: {
    list: { type: Array, default: () => [] }
  },
  data() {
    return {

    }
  },
}
</script>
<style lang="stylus" scoped>
.videos {
  position: absolute;
  padding: 0;
  margin: 0;
  width: 0;
  height: 0;

  .video-item {
    background: yellow;
    position: absolute;
  }
}
</style>