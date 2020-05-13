<template>
  <el-main>
    <url-input v-model="url" :list="$videoList"></url-input>
    <el-row :gutter="50">
      <el-col class="center" :xs="24" :sm="24" :md="12">
        <el-divider content-position="left">Video</el-divider>
        <video ref="localVideo" class="video-item" :src="url" controls muted loop autoplay></video>
      </el-col>

      <el-col class="center" :xs="24" :sm="24" :md="12">
        <el-divider content-position="left">Canvas</el-divider>
        <canvas ref="canvas" class="video-item"></canvas>
      </el-col>
    </el-row>
    <el-row>通过将video元素的功能与结合使用canvas，您可以实时处理视频数据，</el-row>
    <vue-source src="webrtc/views/canvas/DrawVideo.vue" lang="html"></vue-source>
  </el-main>
</template>
<script>
export default {
  name: "DrawVideo",
  data() {
    return {
      url: "",
      canvas: null,
      context: null,
    }
  },
  methods: {
    init(event) {
      let canvas = this.$refs.canvas;
      canvas.setAttribute('width', event.target.offsetWidth);
      canvas.setAttribute('height', event.target.offsetHeight);
      this.context = canvas.getContext("2d");
      this.animate();
    },
    animate() {
      let source = this.$refs.localVideo;
      this.context.clearRect(0, 0, source.offsetWidth, source.offsetHeight);
      this.context.drawImage(source, 0, 0, source.offsetWidth, source.offsetHeight);

      if ("requestAnimationFrame" in window) {
        requestAnimationFrame(this.animate);
      } else if ("webkitRequestAnimationFrame" in window) {
        webkitRequestAnimationFrame(this.animate);
      } else if ("msRequestAnimationFrame" in window) {
        msRequestAnimationFrame(this.animate);
      } else if ("mozRequestAnimationFrame" in window) {
        mozRequestAnimationFrame(this.animate);
      }
    }
  },
  mounted() {
    let video = this.$refs.localVideo;
    video.addEventListener('canplay', this.init);
  },
}
</script>

<style lang="stylus" scoped>
.video-item {
  background: #999;
  width: 570px;
  height: 320px;
  background: #333;
}
</style>