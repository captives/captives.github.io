<template>
  <el-main class="center">
    <el-row :gutter="50">
      <el-col class="center" :xs="24" :sm="24" :md="12">
        <el-divider content-position="left">Screen</el-divider>
        <video ref="localVideo" class="video-item" autoplay></video>
        <div>
          <el-button v-if="!rendering" type="success" @click="initScreenStream">开启录像</el-button>

          <template v-if="localStream">
            <el-button v-if="recording" type="danger" @click="stopRecoder">停止录制</el-button>

            <el-button v-else type="primary" @click="startRecoding(localStream)">开始录制</el-button>
          </template>
        </div>
      </el-col>
      <el-col class="center" :xs="24" :sm="24" :md="12">
        <el-divider content-position="left">Recorder</el-divider>
        <video ref="playVideo" class="video-item" autoplay></video>
        <div v-if="recordBlobs.length">
          <el-tag v-if="recording" type="danger">Rec ....</el-tag>
          <el-button v-else type="danger" @click="downloadfile">下载视频</el-button>
        </div>
      </el-col>
    </el-row>

    <StreamTracks v-model="localStream"></StreamTracks>

    <el-tag v-if="error" class="error" type="danger">{{ error }}</el-tag>
  </el-main>
</template>
<script>
import StreamTracks from './../../components/StreamTracks';
export default {
  name: "UserMediaRecorder",
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
      recordBlobs: [],
      recording: false,
      mediaRecorder: null,
      error: null
    }
  },
  methods: {
    init() {
    },
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
    startRecoding(stream) {
      this.recordBlobs = [];
      var options = { mimeType: 'video/webm;codecs=vp9' };
      if (!MediaRecorder.isTypeSupported(options.mimeType)) {
        console.log(options.mimeType + ' is not Supported');
        options = { mimeType: 'video/webm;codecs=vp8' };

        if (!MediaRecorder.isTypeSupported(options.mimeType)) {
          console.log(options.mimeType + ' is not Supported');
          options = { mimeType: 'video/webm' };

          if (!MediaRecorder.isTypeSupported(options.mimeType)) {
            console.log(options.mimeType + ' is not Supported');
            options = { mimeType: '' };
          }
        }
      }

      try {
        this.mediaRecorder = new MediaRecorder(stream, options);
      } catch (e) {
        alert('Exception while creating MediaRecorder: ' + e + '. mimeType: ' + options.mimeType);
      }

      console.log('Created MediaRecorder', this.mediaRecorder, 'with options', options);
      this.mediaRecorder.onstart = (event) => {
        this.recording = true;
      };

      this.mediaRecorder.onstop = (event) => {
        this.recording = false;
        console.log('Recorder stopped: ', event);
      };

      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          this.recordBlobs.push(event.data);
        }
      };

      this.mediaRecorder.onerror = event => {
        this.error = event;
      }

      this.mediaRecorder.start(10); // 数据收集10ms
      console.log('MediaRecorder started', this.mediaRecorder);
    },
    stopRecoder() {
      if (this.mediaRecorder && this.recording) {
        this.mediaRecorder.stop();
      }

      //播放
      const video = this.$refs.playVideo;
      video.addEventListener('loadedmetadata', event => {
        console.log("loadedmetadata", video.currentTime, video.duration);
        if (video.duration === Infinity) {
          video.currentTime = 1e101;
          video.ontimeupdate = function () {
            video.currentTime = 0;
            video.ontimeupdate = function () {
              delete video.ontimeupdate;
              video.play();
            };
          };
        }
      });

      if (this.recordBlobs && this.recordBlobs.length) {
        const blob = new Blob(this.recordBlobs, { type: 'video/webm' });
        video.src = window.URL.createObjectURL(blob);
      }
    },
    downloadfile() {
      if (this.recordBlobs && this.recordBlobs.length) {
        const blob = new Blob(this.recordBlobs, { type: 'video/webm' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'Rec_' + Date.now() + '.webm';
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
        }, 100);
      }
    }
  },
  mounted() {
    this.init();
  },
  destroyed() {
    this.localStream.getTracks().forEach(track => track.stop());
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