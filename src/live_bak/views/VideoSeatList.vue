<template>
  <el-main>
    <VideoItem
      v-for="(item, index) in list"
      :key="index"
      :index="index + 1"
      :data="item"
      @change="itemChangeHandler"
    ></VideoItem>
  </el-main>
</template>
<script>
import VideoItem from "./VideoItem";
export default {
  name: "VideoList",
  components: {
    VideoItem,
  },
  props: {
    value: { type: Array, default: () => [] },
    list: { type: Array, default: () => [] },
  },
  data() {
    return {
      videoData: [],
    };
  },
  methods: {
    itemChangeHandler(user, offset) {
      if (user.role === this.RoleType.SUBSCRIBER) {
        let data = this.videoData.find((item) => item.id === user.id);
        if (data) {
          data = Object.assign({}, user, offset);
        } else {
          this.videoData.push(Object.assign(user, offset));
        }
        this.$emit("input", this.videoData);
      }
    },
  },
};
</script>
<style lang="stylus" scoped>
.el-main {
  padding: 0;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around !important;
}
</style>
