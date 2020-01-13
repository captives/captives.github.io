<template>
  <el-main class="center">
    <el-row :gutter="50">
      <el-col class="center" :xs="24" :sm="24" :md="12">
        <el-divider content-position="left">Video</el-divider>
        <video ref="localVideo" class="video-item" controls muted loop>
          <source src="/medias/demo.mp4" />
          <source src="/medias/musicdemo.mp4" />
        </video>
      </el-col>

      <el-col class="center" :xs="24" :sm="24" :md="12">
        <el-divider content-position="left">Canvas</el-divider>
        <canvas ref="draw" class="video-item"></canvas>
      </el-col>
    </el-row>
    <vue-source value="src/webrtc/views/canvas/DrawVideoForFabric.vue" lang="html"></vue-source>
  </el-main>
</template>
<script>
import { fabric } from 'fabric'
export default {
  name: "DrawVideo",
  data() {
    return {
      canvas: null
    }
  },
  methods: {
    init(event) {
      let video = this.$refs.localVideo;
      let el = this.$refs.draw;
      el.setAttribute('width', el.parentNode.offsetWidth - 100);
      el.setAttribute('height', el.parentNode.offsetHeight);

      let canvas = new fabric.Canvas(el);
      console.log('video element', video, el.parentNode);
      let videoEl = new fabric.Image(video, {
        left: video.offsetWidth / 2,
        top: video.offsetHeight / 2,
        width: video.offsetWidth / 2,
        height: video.offsetHeight / 2,
        originX: 'center',
        originY: 'center',
        objectCaching: false,
      });
      canvas.add(videoEl);
      videoEl.getElement().play();
      console.log(videoEl, videoEl.getElement());


      fabric.util.requestAnimFrame(function render() {
        canvas.renderAll();
        fabric.util.requestAnimFrame(render);
      });
    },
  },
  mounted() {
    let video = this.$refs.localVideo;
    video.addEventListener('canplay', this.init);
  },
}
</script>

<style lang="stylus" scoped>
.video-item {
  width: 570px;
  height: 320px;
  background: #333;
}
</style>