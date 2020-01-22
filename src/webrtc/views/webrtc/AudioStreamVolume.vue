<template>
  <el-main class="center">
    <el-row :gutter="50">
      <el-col class="center" :xs="24" :sm="24" :md="12">
        <el-divider content-position="left">Audio Stream</el-divider>
        <video ref="localVideo" class="video-item" autoplay></video>
      </el-col>
      <el-col class="center" :xs="24" :sm="24" :md="12">
        <el-divider content-position="left">Audio Stream Volume</el-divider>
        <el-form v-if="soundMeter" label-width="80px">
          <el-form-item label="Instant:">
            <el-progress
              :stroke-width="20"
              :text-inside="true"
              :percentage="Math.floor(soundMeter.instant * 500)"
            ></el-progress>
          </el-form-item>
          <el-form-item label="Slow:">
            <el-progress
              :stroke-width="20"
              :text-inside="true"
              :percentage="Math.floor(soundMeter.slow * 500)"
              color="#67C23A"
            ></el-progress>
          </el-form-item>
          <el-form-item label="Clip:">
            <el-progress
              :stroke-width="20"
              :text-inside="true"
              :percentage="Math.floor(soundMeter.clip * 500)"
              color="#F56C6C"
            ></el-progress>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <StreamTracks v-model="localStream"></StreamTracks>
    <el-tag v-if="error" class="error" type="danger">{{ error }}</el-tag>
    <vue-source src="webrtc/views/webrtc/AudioStreamVolume.vue" lang="html"></vue-source>
  </el-main>
</template>
<script>
import StreamTracks from './../../components/StreamTracks';
import SoundMeter from './../../plugins/SoundMeter'
export default {
  name: "AudioStreamVolume",
  components: { StreamTracks },
  data() {
    return {
      localStream: null,
      options: {
        audio: true,
        video: false
      },
      soundMeter: null,
      error: null
    }
  },
  methods: {
    init() {
      this.initLocalStream().then(stream => {
        this.addAudioContextListener(stream);
      });
    },
    initLocalStream() {
      const that = this;
      const video = this.$refs.localVideo;
      return new Promise((resolve, reject) => {
        //启动媒体设备
        navigator.mediaDevices.getUserMedia(this.options).then((stream) => {
          this.localStream = stream;
          stream.oninactive = function () {
            console.log('Stream inactive');
          };

          video.addEventListener('loadedmetadata', (e) => {
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
    addAudioContextListener(stream) {
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const audioContext = new AudioContext();

        this.soundMeter = new SoundMeter(audioContext);
        this.soundMeter.connectToSource(stream, error => {
          if (error) {
            this.error = error;
          }
        });
      } catch (e) {
        alert('Web Audio API not supported.');
      }
    }
  },
  mounted() {
    this.init();
  },
  destroyed() {
    if (this.soundMeter) {
      this.soundMeter.stop();
    }

    this.localStream && this.localStream.getTracks().forEach(track => {
      track.stop();
    });
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

.el-progress {
  line-height: 40px;
}
</style>