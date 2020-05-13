<template>
  <el-main class="center">
    <el-row :gutter="50">
      <el-col class="center" :xs="24" :sm="24" :md="12">
        <el-divider content-position="left">Camera</el-divider>
        <video ref="localVideo" class="video-item" autoplay></video>
      </el-col>
      <el-col class="center" :xs="24" :sm="24" :md="12">
        <el-divider content-position="left">Audio Spectrum</el-divider>
        <canvas ref="canvas" class="video-item"></canvas>
      </el-col>
    </el-row>

    <StreamTracks v-model="localStream"></StreamTracks>

    <el-tag v-if="error" class="error" type="danger">{{ error }}</el-tag>

    <vue-source src="webrtc/views/webrtc/MediaStreamVisualizer.vue" lang="html"></vue-source>
  </el-main>
</template>
<script>
import StreamTracks from './../../components/StreamTracks';
import StreamVisualizer from './../../plugins/streamvisualizer'
export default {
  name: "MediaStreamVisualizer",
  components: { StreamTracks },
  data() {
    return {
      localStream: null,
      options: {
        audio: true,
        video: {
          width: { exact: 720 },
          height: { exact: 405 }
        }
      },
      error: null
    }
  },
  methods: {
    init() {
      const that = this;
      const video = this.$refs.localVideo;
      //启动媒体设备
      navigator.mediaDevices.getUserMedia(this.options).then((stream) => {
        this.localStream = stream;
        stream.oninactive = function () {
          console.log('Stream inactive');
        };

        video.onloadedmetadata = function (e) {
          console.log("AudioTracks", stream.getAudioTracks());
          console.log("VideoTracks", stream.getVideoTracks());
        };

        video.srcObject = stream;
        //绘图
        var streamVisualizer = new StreamVisualizer(stream, this.$refs.canvas);
        streamVisualizer.start();

      }).catch(function (error) {
        that.error = error;
        console.log('navigator.getUserMedia error: ', error);
      });
    }
  },
  mounted() {
    this.init();
  },
  destroyed() {
    this.localStream && this.localStream.getTracks().forEach(track => {
      track.stop();
    });
  }
}
</script>
<style lang="stylus" scoped>
.video-item {
  height: 270px;
  min-width: 480px;

  & canvas {
    background: #A0CFFF;
  }
}
</style>