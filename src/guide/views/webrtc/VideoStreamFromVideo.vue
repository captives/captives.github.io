<template>
  <el-main>
    <url-input v-model="url" :list="$videoList"></url-input>
    <el-row :gutter="50">
      <el-col class="center" :xs="24" :sm="24" :md="12">
        <el-divider content-position="left">Video</el-divider>
        <video ref="localVideo" class="video-item" :src="url" controls muted loop autoplay></video>
      </el-col>
      <el-col class="center" :xs="24" :sm="24" :md="12">
        <el-divider content-position="left">Capture</el-divider>
        <video ref="playVideo" class="video-item" autoplay></video>
      </el-col>
    </el-row>

    <StreamTracks v-model="stream"></StreamTracks>

    <vue-source src="guide/views/webrtc/VideoStreamFromVideo.vue" lang="html"></vue-source>
  </el-main>
</template>
<script>
import StreamTracks from './../../components/StreamTracks';
export default {
  name: "VideoStreamFromVideo",
  components: {
    StreamTracks
  },
  data() {
    return {
      url: "",
      stream: null
    }
  },
  methods: {
    oncanplay(video) {
      const fps = 0;
      const player = this.$refs.playVideo;
      if (video.captureStream) {
        this.stream = video.captureStream(fps);
      } else if (video.mozCaptureStream) {
        this.stream = video.mozCaptureStream(fps);
      } else {
        console.error('Stream capture is not supported');
        this.stream = null;
      }

      player.addEventListener('loadedmetadata', (e) => {
        console.log("AudioTracks", this.stream.getAudioTracks());
        console.log("VideoTracks", this.stream.getVideoTracks());
      });

      player.autoplay = true;
      player.srcObject = this.stream;
    }
  },
  mounted() {
    const video = this.$refs.localVideo;
    video.addEventListener('canplay', () => {
      this.oncanplay(video);
    });
  },
  destroyed() {
    if (this.stream) {
      this.stream = null;
    }
  }
}
</script>
<style lang="stylus" scoped>
.video-item {
  background: #999;
  height: 270px;
  background: #333;
  margin-right: 10px;
}
</style>