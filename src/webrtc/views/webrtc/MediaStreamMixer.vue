<template>
  <el-main>
    <url-input v-model="url" :list="$videoList"></url-input>
    <el-row :gutter="50">
      <el-col class="center" :xs="24" :sm="24" :md="12">
        <el-divider content-position="left">Video</el-divider>
        <video ref="localVideo" class="video-item" :src="url" controls loop autoplay></video>
      </el-col>
      <el-col class="center" :xs="24" :sm="24" :md="12">
        <el-divider content-position="left">tracks</el-divider>
        <StreamTracks v-model="videoStream"></StreamTracks>
      </el-col>
    </el-row>
    <el-row :gutter="50">
      <el-col class="center" :xs="24" :sm="24" :md="12">
        <el-divider content-position="left">Audio</el-divider>
        <audio ref="localAudio" src="/medias/jinli.mp3" controls></audio>
        <el-row style="padding-top: 20px">
          <el-checkbox v-model="mixing">{{mixing ? '替换声道' : '原声道'}}</el-checkbox>
          <el-button type="success" size="mini" @click="videoPlayer">播放</el-button>
          <el-button type="danger" size="mini" @click="stopPlayer">停止播放</el-button>
          <el-button type="success" size="mini">下载视频</el-button>
        </el-row>
      </el-col>
      <el-col class="center" :xs="24" :sm="24" :md="12">
        <el-divider content-position="left">tracks</el-divider>
        <StreamTracks v-model="audioStream"></StreamTracks>
      </el-col>
    </el-row>

    <el-row :gutter="50">
      <el-col class="center" :xs="24" :sm="24" :md="12">
        <el-divider content-position="left">Recorder</el-divider>
        <StreamRecorder :stream="remixStream"></StreamRecorder>
      </el-col>
      <el-col class="center" :xs="24" :sm="24" :md="12">
        <el-divider content-position="left">tracks</el-divider>
        <StreamTracks v-model="remixStream"></StreamTracks>
      </el-col>
    </el-row>

    <vue-source src="/webrtc/views/webrtc/MediaStreamMixer.vue" lang="html"></vue-source>
  </el-main>
</template>
<script>
import StreamTracks from './../../components/StreamTracks';
import StreamRecorder from './../../components/StreamRecorder';
export default {
  name: "MediaStreamMixer",
  components: {
    StreamTracks,
    StreamRecorder
  },
  data() {
    return {
      url: null,
      mixing: false,
      videoStream: null,
      audioStream: null,
      remixStream: null
    }
  },
  methods: {
    getMediaStream(video) {
      const fps = 0;
      var stream = null;
      if (video.captureStream) {
        stream = video.captureStream(fps);
      } else if (video.mozCaptureStream) {
        stream = video.mozCaptureStream(fps);
      } else {
        console.error('Stream capture is not supported');
        stream = null;
      }
      stream.onaddtrack = (event) => {
        console.log('track add', event);
      }

      stream.onremovetrack = (event) => {
        console.log('track remove', event);
      }

      stream.onended = () => {
        console.log('stream on end');
      }
      return stream;
    },
    videoPlayer() {
      this.stopPlayer();
      this.remixStream = new MediaStream();
      this.videoStream.getVideoTracks().forEach((track) => {
        this.remixStream.addTrack(track.clone());
      });

      if (this.mixing) {
        this.audioStream.getAudioTracks().forEach((track) => {
          this.remixStream.addTrack(track.clone());
        });
      } else {
        this.videoStream.getAudioTracks().forEach((track) => {
          this.remixStream.addTrack(track.clone());
        });
      }
    },
    stopPlayer() {
      if (this.remixStream) {
        this.remixStream.getTracks().forEach(track => { track.stop(); });
        this.remixStream = [];
      }
    },
    close() {
      if (this.videoStream) {
        this.videoStream.getTracks().forEach(track => track.stop());
      }
      if (this.audioStream) {
        this.audioStream.getTracks().forEach(track => track.stop());
      }
      if (this.remixStream) {
        this.remixStream.getTracks().forEach(track => track.stop());
      }
    }
  },
  mounted() {
    const video = this.$refs.localVideo;
    video.addEventListener('canplay', () => {
      this.videoStream = this.getMediaStream(video);
    });

    const audio = this.$refs.localAudio;
    audio.addEventListener('canplay', () => {
      this.audioStream = this.getMediaStream(audio);
    });
  },
  destroyed() {
    this.close();
  }
}
</script>
<style lang="stylus" scoped>
.el-row {
  >>> .el-table {
    margin-top: 0;
  }

  audio {
    width: 720px;
  }
}

.video-item {
  background: #999;
  height: 270px;
  background: #333;
  margin-right: 10px;
}
</style>