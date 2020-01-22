<template>
  <el-main class="center">
    <el-row :gutter="50">
      <el-col class="center" :xs="24" :sm="24" :md="12">
        <el-divider content-position="left">Display Media</el-divider>
        <video ref="localVideo" class="video-item" autoplay></video>
        <el-row>
          <el-button v-if="!rendering" type="success" @click="initScreenStream">开启录像</el-button>
          <el-button v-else type="danger" @click="close">关闭录像</el-button>
        </el-row>
      </el-col>
    </el-row>

    <StreamTracks v-model="localStream"></StreamTracks>

    <el-tag v-if="error" class="error" type="danger">{{ error }}</el-tag>

    <vue-source src="webrtc/views/webrtc/VideoStreamFromDisplayMedia.vue" lang="html"></vue-source>
  </el-main>
</template>
<script>
import StreamTracks from './../../components/StreamTracks';
export default {
  name: "DisplayMedia",
  components: { StreamTracks },
  data() {
    return {
      rendering: false,
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
    getDisplayMedia() {
      if (navigator.getDisplayMedia) {
        return navigator.getDisplayMedia({ video: true });
      } else if (navigator.mediaDevices.getDisplayMedia) {
        return navigator.mediaDevices.getDisplayMedia({ video: true });
      } else {
        return navigator.mediaDevices.getUserMedia({ video: { mediaSource: 'screen' } });
      }
    },
    initScreenStream() {
      const that = this;
      const video = this.$refs.localVideo;
      return new Promise((resolve, reject) => {
        //启动媒体设备
        this.getDisplayMedia().then((stream) => {
          this.localStream = stream;
          stream.oninactive = function () {
            that.rendering = false;
            // video.stop();
            console.log('Capture stream inactive - stop recording!');
          };

          video.addEventListener('loadedmetadata', (e) => {
            that.rendering = true;
            console.log("AudioTracks", stream.getAudioTracks());
            console.log("VideoTracks", stream.getVideoTracks());
          });

          video.srcObject = stream;
          resolve(stream);
        }).catch(function (error) {
          that.error = error;
          console.log('navigator.getUserMedia error: ', error);
          reject(error);
        });
      });
    },
    close() {
      this.localStream && this.localStream.getTracks().forEach(track => track.stop());
    }
  },
  destroyed() {
    this.close();
  }
}
</script>
<style lang="stylus" scoped>
.video-item {
  height: 270px;
  width: 480px;
  background: #333;
  margin-right: 10px;
}
</style>