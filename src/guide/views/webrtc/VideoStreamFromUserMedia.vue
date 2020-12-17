<template>
  <el-main class="center">
    <video ref="localVideo" class="video-item" autoplay></video>
    <StreamTracks v-model="localStream"></StreamTracks>

    <el-tag v-if="error" class="error" type="danger">{{ error }}</el-tag>

    <vue-source
      src="guide/views/webrtc/VideoStreamFromUserMedia.vue"
      lang="html"
    ></vue-source>
  </el-main>
</template>
<script>
import StreamTracks from "./../../components/StreamTracks";
export default {
  name: "UserMedia",
  components: { StreamTracks },
  data() {
    return {
      localStream: null,
      options: {
        audio: true,
        video: {
          width: { exact: 720 },
          height: { exact: 405 },
        },
      },
      error: null,
    };
  },
  mounted() {
    this.init();
  },
  destroyed() {
    this.localStream &&
      this.localStream.getTracks().forEach((track) => {
        track.stop();
      });
  },
  methods: {
    init() {
      const that = this;
      const video = this.$refs.localVideo;
      //启动媒体设备
      navigator.mediaDevices
        .getUserMedia(this.options)
        .then((stream) => {
          this.localStream = stream;
          stream.oninactive = function () {
            console.log("Stream inactive");
          };

          video.addEventListener("loadedmetadata", (e) => {
            console.log("AudioTracks", stream.getAudioTracks());
            console.log("VideoTracks", stream.getVideoTracks());
          });

          video.srcObject = stream;
        })
        .catch(function (error) {
          that.error = error;
          console.log("navigator.getUserMedia error: ", error);
        });
    },
  },
};
</script>
<style lang="stylus" scoped>
.video-item {
  height: 270px;
  width: 480px;
  background: #333;
  margin-right: 10px;
}
</style>
